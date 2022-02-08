import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from "react-native";
import moment from "moment";

export type EarthImageItemProps = {
    earthItem:{
        identifier: string;
        image: string;

    }
}

const EarthImageItem = (props: EarthImageItemProps) => {

    const year = props.earthItem.image.substring(8,12);
    const month = props.earthItem.image.substring(12,14);
    const date = props.earthItem.image.substring(14,16);

    return (
        <View style={styles.container}>
            <Text style={styles.date}>
                Capture on {moment(month +"/"+ date + "/" + year).format("Do MMM YY")}
            </Text>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${date}/png/${props.earthItem.image}.png?api_key=`
                    }}
                    style={styles.image}
                />
            </View>
        </View>
    );
};

export default EarthImageItem;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: Dimensions.get("window").width

    },
    date:{
        fontSize: 17,
        fontWeight: "500",
        marginTop: 20
    },
    imageContainer:{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    image:{
        height: 350,
        width: 350
    }
});

