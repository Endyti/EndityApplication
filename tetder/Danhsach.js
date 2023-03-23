import { Text, StyleSheet, View, FlatList, Modal, TextInput, Button, ImageBackground, Alert } from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Danhsach extends Component {
  state = {
    data: [],
    modalVisible: false,
    id: 1,
    ten: "",
    sotinchi: "",
    trangthai: "",
    price: ""
  }

  GetData = () => {
    fetch('http://10.24.61.50:3000/subjects/')
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json })
        console.log(this.state.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  DeleteData = (id) => {
    fetch('http://10.24.61.50:3000/subjects/' + id, {
      method: 'DELETE',
    })
      .then(res => res.json()) // or res.json()
      .then(data => console.log(data))

  }
  dialogdelete = (id) => {
    Alert.alert("Thong bao", "Bạn có muốn xóa không",
      [{ text: "OK", onPress: () => { this.DeleteData(id), this.GetData() } }, { text: "cancel" }]
    )
  }
  UpdateData = (id) => {
    fetch('http://10.24.61.50:3000/subjects/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        "ten": this.state.ten,
        "sotinchi": this.state.sotinchi,
        "trangthai": this.state.trangthai,
        "price": this.state.price
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  validate = (id) => {
    if (this.state.ten == "") {
      Alert.alert('treong ten')
    } else if (this.state.sotinchi == "") {
      Alert.alert('trong số tín chỉ')
    } else if (this.state.trangthai == "") {
      Alert.alert("Không được để trống trạng thái")
    } else if (this.state.gia == "") {
      Alert.alert("Không được để trống giá")
    }
    else {
      Alert.alert('sua thanh cong')
      this.UpdateData(this.state.id)
    }
  }
  render() {
    return (
      <SafeAreaView style={{ marginTop: 25 }} onLayout={this.GetData}>
      

        <View>

          <FlatList
            data={this.state.data}
            renderItem={({ item }) =>
              <View style={{
                flexDirection: 'row',
                width: "100%"
              }}>
                <TouchableOpacity style={{ width: 400 }}
                onPress={()=>{this.dialogdelete(item.id)}}>
                  <View
                    style={{
                      width: 500,
                      alignItems: "center",
                      flexDirection: "row",
                      margin: 5,
                      
                      backgroundColor: 'tomato',
                      padding: 5,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 25,  }}>{item.ten} </Text>
                    <Text style={{ fontSize: 25, marginLeft: 20  }}>{item.sotinchi} </Text>
                    <Text style={{ fontSize: 25,  marginLeft: 20 }}>{item.trangthai} </Text>
                    <Text style={{ fontSize: 25,  marginLeft: 20 }}>{item.price} </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalVisible: true }),
                      this.setState({ id: item.id })
                  }}
                  style={{}}
                ><ImageBackground style={{ height: 30, width: 30, margin: 10, marginTop: 10 }}
                  source={require('../imgresource/iconupdate.png')}

                ></ImageBackground></TouchableOpacity>

              </View>
            }
          >
          </FlatList>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!this.state.modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Update</Text>

                  <TextInput style={{ borderBottomWidth: 1, height: 30, width: 250 }} placeholder='Nhập tên'
                  onChangeText={(text)=>this.setState({ten : text})}></TextInput>
                  <TextInput style={{ borderBottomWidth: 1, height: 30, width: 250 }} placeholder='Nhập tín chỉ'
                  onChangeText={(text)=>this.setState({sotinchi : text})}></TextInput>
                  <TextInput style={{ borderBottomWidth: 1, height: 30, width: 250 }} placeholder='Nhập trạng thái '
                  onChangeText={(text)=>this.setState({trangthai : text})}></TextInput>
                  <TextInput style={{ borderBottomWidth: 1, height: 30, width: 250 }} placeholder='Nhập giá'
                  onChangeText={(text)=>this.setState({price : text})}></TextInput>
                  <View style={{flexDirection:"row"}}>
                  <Button title='ok' onPress={() => { this.validate(this.setState.id), this.GetData() }
                  }>
                  </Button>
                  <Button title='no' onPress={() => this.setState({ modalVisible: false })}></Button>
                  </View>
                  
                </View>
              </View>
            </Modal>
          </View>
        </View>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})