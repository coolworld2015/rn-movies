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
    AsyncStorage,
    Alert
} from 'react-native';

class MoviesDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			pushEvent: {
				trackName: '',
				releaseDate: ' - '
			}
		};
		
		if (props.data) {
			this.state = {
				pushEvent: props.data
			};
		}	
    }
	
	goBack() {
		this.props.navigator.pop();
	}
	
    render() {
        var image = <View />;
		
		if (this.state.pushEvent) {
			if (this.state.pushEvent.artworkUrl100) {
				image = <Image
					source={{uri: this.state.pushEvent.artworkUrl100.replace('100x100bb.jpg', '500x500bb.jpg')}}
					style={{
						height: 300,
						width: 200,
						borderRadius: 20,
						margin: 20
					}}
				/>;
			} else {
				image = <Image
					source={{uri: this.state.pushEvent.pic}}
					style={{
						height: 300,
						width: 200,
						borderRadius: 20,
						margin: 20
					}}
				/>;
			}
		}
		
        return (
			<View style={{flex: 1, justifyContent: 'center'}}>
				<View style={{
					flexDirection: 'row',
					justifyContent: 'space-between'
				}}>
					<View>
						<TouchableHighlight
							//onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'black'
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
								{this.state.pushEvent.trackName}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							//onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'black'
							}}>
								 
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
				<ScrollView>
					<View style={{
							flex: 1,
							padding: 10,
							paddingBottom: 55,
							justifyContent: 'flex-start',
							backgroundColor: 'white'
					}}>
					<View style={{
						 alignItems: 'center'
					}}>
						{image}
					</View>
					
						<Text style={styles.welcome1}>
							{this.state.pushEvent.trackName}
						</Text>

						<Text style={styles.welcome}>
							{this.state.pushEvent.releaseDate.split('-')[0]}
						</Text>

						<Text style={styles.welcome}>
							{this.state.pushEvent.country}
						</Text>

						<Text style={styles.welcome}>
							{this.state.pushEvent.primaryGenreName}
						</Text>

						<Text style={styles.welcome}>
							{this.state.pushEvent.artistName}
						</Text>

						<Text style={{
							fontSize: 16,
							padding: 20,
							textAlign: 'justify',
							color: 'black'
						}}>
							{this.state.pushEvent.longDescription}
						</Text>
						
						<TouchableHighlight
							onPress={()=> this.goBack()}

							style={styles.button}>
							<Text style={styles.buttonText}>Back</Text>
						</TouchableHighlight>
						
					</View>
				</ScrollView>
			</View>
		);
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome1: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
		color: 'black'
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
		color: 'black'
    },
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height: 65
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
    },
    button: {
        height: 50,
        margin: 10,
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
        paddingTop: 10
    }
});

export default MoviesDetails;
