import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function App() {

  const [currency, setCurrency] = useState({});


  const getCurrency = async () => {
    try {
      const response = await fetch('http://forex.cbm.gov.mm/api/latest');
      const json = await response.json();
      setCurrency(json.rates);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCurrency();
  }, [])

  const [rate, setRate] = useState();
  const [value,setValue] = useState(0);
  
  const rateCalculator=(th)=>{
      if(th===''){
        setValue(0)
      }else{
        const pureRate =rate.replace(',','')
        let num = parseInt(th)
        let result = Math.round(parseFloat(pureRate)) * parseInt(th)
        setValue(result)
      }
      
      
  }
  return (
    <View style={styles.container}>

      <Picker  style={{ height: 50, width: 200, backgroundColor:'blue'}} 
        selectedValue={rate}
        onValueChange={(itemValue, itemIndex) =>
          setRate(itemValue)
        }>
      
       {
        Object.entries(currency).map(([key, value]) => {
        
          return (
              <Picker.Item label={key} value={value} />
          )

        })
      }

</Picker>

      <TextInput placeholder='Enter value'
        blurOnSubmit
        onEndEditing={()=>{
          setValue(0)
          
        }}
        keyboardType='number-pad'
        style={{backgroundColor:"yellow",fontSize:25,height:50}} 
        onChangeText={(text)=>{
         
            rateCalculator(text)
          
          
        }
        }
       
        />

      <Text style={{backgroundColor:"green",fontSize:18,width:80,height:50,textAlign:'center'}}>
        
        {value}  {'MMK'}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    backgroundColor: 'cyan',
    paddingVertical:50,
    flexDirection:'row',
    
  },
});
