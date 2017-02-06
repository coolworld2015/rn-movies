//'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TabBarIOS,
    NavigatorIOS,
    TextInput,
	BackAndroid,
	Alert
} from 'react-native';

class UserDetails extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});			
			
		if (props.data) {
			this.state = {
				id: props.data.id,
				name: props.data.name,
				pass: props.data.pass,
				description: props.data.description,
				showProgress: false
			};
		}		
    }

    updateUser() {
        if (this.state.name == '' ||
            this.state.pass == '' ||
            this.state.description == '') {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true,
			bugANDROID: ' '
        });

        fetch(appConfig.url + 'api/users/update', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                pass: this.state.pass,
                description: this.state.description,
				authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				if (responseData.pass) {
					appConfig.users.refresh = true;
					this.props.navigator.pop();
				} else {
					this.setState({
						badCredentials: true
					});
				}
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }

    deleteUserDialog() {
		Alert.alert(
			'Delete user',
			'Are you sure you want to delete user ' + this.state.name + '?',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
				{
					text: 'OK', onPress: () => {
					this.deleteUser();
					}
				},
			]
		);	
	}
	
    deleteUser() {		
        this.setState({
            showProgress: true,
			bugANDROID: ' '
        });
		
        fetch(appConfig.url + 'api/users/delete', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
				authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
			.then((response)=> response.json())
            .then((responseData)=> {
				console.log(responseData);
				if (responseData.text) {
					appConfig.users.refresh = true;
					this.props.navigator.pop();
				} else {
					this.setState({
						badCredentials: true
					});
				}
            })
            .catch((error)=> {
                console.log(error);
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });

    }
    
	goBack() {
		this.props.navigator.pop();
	}
	
    render() {
        var errorCtrl = <View />;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        var validCtrl = <View />;

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        return (
            <ScrollView>
				<View style={{flex: 1, justifyContent: 'center'}}>
					<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
						<View>
							<TouchableHighlight
								onPress={()=> this.goBack()}
								underlayColor='#ddd'
							>
								<Text style={{
									fontSize: 16,
									textAlign: 'center',
									margin: 14,
									fontWeight: 'bold',
									color: 'black'
								}}>
									Back
								</Text>
							</TouchableHighlight>	
						</View>
						<View>
							<TouchableHighlight
								underlayColor='#ddd'
							>
								<Text style={{
									fontSize: 20,
									textAlign: 'center',
									margin: 10,
									fontWeight: 'bold',
									color: 'black'
								}}>
									{this.state.name}
								</Text>
							</TouchableHighlight>	
						</View>						
						<View>
							<TouchableHighlight
								onPress={()=> this.deleteUserDialog()}
								underlayColor='#ddd'
							>
								<Text style={{
									fontSize: 16,
									textAlign: 'center',
									margin: 14,
									fontWeight: 'bold',
									color: 'black'
								}}>
									Delete
								</Text>
							</TouchableHighlight>	
						</View>
					</View>
					
					<View style={{
						flex: 1,
						padding: 10,
						paddingBottom: 55,
						justifyContent: 'flex-start',
						backgroundColor: 'white'
					}}>
						<TextInput
							onChangeText={(text)=> this.setState({
								name: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.name}
							placeholder="Name">
						</TextInput>

						<TextInput
							style={styles.loginInput}
							value={this.state.id}>
						</TextInput>

						<TextInput
							onChangeText={(text)=> this.setState({
								pass: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.pass}
							placeholder="Password">
						</TextInput>

						<TextInput
							onChangeText={(text)=> this.setState({
								description: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.description}
							placeholder="Description">
						</TextInput>

						{validCtrl}

						<TouchableHighlight
							onPress={()=> this.updateUser()}

							style={styles.button}>
							<Text style={styles.buttonText}>Submit</Text>
						</TouchableHighlight>
						
						{errorCtrl}

						<ActivityIndicator
							animating={this.state.showProgress}
							size="large"
							style={styles.loader}
						/>
						
						<Text>{this.state.bugANDROID}</Text>
					</View>
				</View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'whitesmoke'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 0,
        color: 'black'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
        marginTop: 40
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    },
    img: {
        height: 95,
        width: 75,
        borderRadius: 20,
        margin: 20
    }
});

export default UserDetails;
