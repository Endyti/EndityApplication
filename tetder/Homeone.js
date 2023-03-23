import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';


export default class Homeone extends Component {
    state = {
        data: [],
        ten: "",
        sotinchi: "",
        trangthai: "",
        gia: ""
    }


    validate = () => {
        if (this.state.ten == "" || this.state.sotinchi=="" || this.state.trangthai=="" || this.state.gia=="") {
           Alert.alert("Hãy nhập đủ thông tin");
        }else {
            Alert.alert('Thêm thành công')
            this.addData()
        }
    }


    addData = () => {
        fetch('http://10.24.61.50:3000/subjects', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ten": this.state.ten,
                "sotinchi": this.state.sotinchi,
                "trangthai": this.state.trangthai,
                "price": this.state.gia,
            })
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    render() {
        return (
            <SafeAreaView style={{ padding: 20, marginTop: 120 }}>
                <Text style={{ marginLeft: "15%", fontSize: 30, color: "black", fontWeight: "bold", alignItems: "center" }}>Nhập Thông tin</Text>

                <TextInput
                    style={{
                        marginLeft: 30,
                        marginRight: 30,
                        borderWidth: 1,
                        marginBottom: 20,
                        paddingLeft: 5,
                        height: 40,
                        marginTop: 10
                    }}

                    placeholder=" nhập tên"
                    onChangeText={(text) => { this.setState({ ten: text }) }}
                >
                </TextInput>
               <TextInput
                style={{
                    marginLeft: 30,
                    marginRight: 30,
                    borderWidth: 1,
                    marginBottom: 20,
                    paddingLeft: 5,
                    height: 40,
                    marginTop: 10
                }}

                placeholder=" nhập số tín chỉ"
                onChangeText={(text) => { this.setState({ sotinchi: text }) }}>
               </TextInput>
               <TextInput
                style={{
                    marginLeft: 30,
                    marginRight: 30,
                    borderWidth: 1,
                    marginBottom: 20,
                    paddingLeft: 5,
                    height: 40,
                    marginTop: 10
                }}

                placeholder=" nhập trạng thái "
                onChangeText={(text) => { this.setState({ trangthai: text }) }}>

               </TextInput>
               <TextInput
                style={{
                    marginLeft: 30,
                    marginRight: 30,
                    borderWidth: 1,
                    marginBottom: 20,
                    paddingLeft: 5,
                    height: 40,
                    marginTop: 10
                }}

                placeholder=" nhập giá "
                onChangeText={(text) => { this.setState({ gia: text }) }}>

               </TextInput>
              

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => { this.validate() }}
                        style={{
                            marginRight: 20,
                            alignItems: 'center',
                            width: 150,
                            backgroundColor: 'blue',
                            padding: 15,
                            borderRadius: 10

                        }}
                    ><Text style={{
                        color: 'white',
                        fontSize: 20
                    }}>
                            Lưu
                        </Text></TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            const { navigation } = this.props
                            navigation.navigate('Danhsach')

                        }}
                        style={{
                            alignItems: 'center',
                            width: 150,
                            backgroundColor: 'blue',
                            padding: 15,
                            borderRadius: 10

                        }}
                    ><Text style={{
                        color: 'white',
                        fontSize: 20
                    }}>
                            Show
                        </Text></TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({})