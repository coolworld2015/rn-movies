'use strict';

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
	BackAndroid
} from 'react-native';

class AuditDetails extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
		this.state = {
			name: ''
		}	
					
		if (props.data) {
			var ip = props.data.ip.split(':');

			this.state = {
				id: props.data.id,
				name: props.data.name,
				date: props.data.date,
				ip: ip[3],
				description: props.data.description,
				showProgress: false
			};
		}
    }
	
    goBack(rowData) {
		this.props.navigator.pop();
	}
	
    render() {
        return (
            <ScrollView>
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
								fontSize: 18,
								textAlign: 'center',
								margin: 20,
								fontWeight: 'bold'
							}}>
								 
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
								{this.state.date}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 18,
								textAlign: 'center',
								margin: 20,
								fontWeight: 'bold'
							}}>
								 
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
					
				<View style={{
					flex: 1,
					padding: 10,
					paddingBottom: 95,
					justifyContent: 'flex-start',
					backgroundColor: 'white'
				}}>
					<TextInput
						style={styles.loginInput}
						value={this.state.name}
						placeholder="Name">
					</TextInput>
					
					<TextInput
						style={styles.loginInput}
						value={this.state.id}
						placeholder="ID">
					</TextInput>
					
					<TextInput
						style={styles.loginInput}
						value={this.state.ip}
						placeholder="IP">
					</TextInput>

					<TextInput
						style={styles.loginInput1}
						value={this.state.description}
						multiline={true}
						placeholder="Description">
					</TextInput>

					<TouchableHighlight
						onPress={()=> this.goBack()}

						style={styles.button}>
						<Text style={styles.buttonText}>Back</Text>
					</TouchableHighlight>
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
    loginInput1: {
        height: 100,
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
        marginTop: 20
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

export default AuditDetails;
