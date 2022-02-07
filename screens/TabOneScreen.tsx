import {Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, {useEffect, useState} from "react";
import axios from "axios";
import EarthImageItem from "../components/EarthImageItem";

export default function TabOneScreen() {

  const [earthData,setEarthData] = useState([]);

  const getMostRecentData = () => {
    axios.get('https://api.nasa.gov/EPIC/api/natural/images',{
      params: {
        api_key: ""
      }
    })
        .then((response)=> {
          // handle success
          // console.log(response.data[0]);
          setEarthData(response.data);

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
  }

  useEffect(()=>{
    getMostRecentData();
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft
      </Text>
        <FlatList
            data={earthData}
            renderItem={({item})=> <EarthImageItem earthItem={item}/>}
            keyExtractor={item=> item.identifier}
            horizontal
            snapToAlignment="start"
            decelerationRate={"fast"}
            snapToInterval={Dimensions.get("window").width}
            showsHorizontalScrollIndicator={false}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  title:{
    fontSize: 20,
    fontWeight: "bold"
},
});
