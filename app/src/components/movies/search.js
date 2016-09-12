'use strict'

import React, { Component } from 'react';
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
    Switch
} from 'react-native';

import SearchResults from './searchResults';

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false,
            eventSwitchBase: true,
            eventSwitchTitle: true
        }
    }

    clearSearch(){
      this.setState({
        searchQuery: '',
        invalidValue: false
      })
    }

    onSearchPressed(){
        if (this.state.searchQuery == undefined) {
          this.setState({
              invalidValue: true
          });
        return;
        }

        this.props.navigator.push({
            title: this.state.searchQuery,
            component: SearchResults,
            passProps: {
                searchQuery: this.state.searchQuery
            }
        });
    }

    render(){
      var errorCtrl = <View />;

      if(this.state.serverError){
          errorCtrl = <Text style={styles.error}>
              Something went wrong.
          </Text>;
      }

      var validCtrl = <View />;

      if(this.state.invalidValue){
          validCtrl = <Text style={styles.error}>
              Value required - please provide.
          </Text>;
      }

        return (
            <ScrollView>
            <View style={styles.container}>
          			<TouchableHighlight
                    onPress={this.clearSearch.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Search movies</Text>
                </TouchableHighlight>

              <View style={styles.loginInput}>
                <Text style={{
                    fontSize: 18
                }}>
                    Search in iTunes
                    <Switch
                      style={{
                        marginLeft: 90,
                        paddingLeft: 20,
                        marginTop: 5
                      }}
                      onValueChange={(value) => this.setState({
                          eventSwitchBase: value
                      })}
                      value={this.state.eventSwitchBase}
                    />
                  </Text>
                </View>

                <View style={styles.loginInput}>
                  <Text style={{
                      fontSize: 18
                  }}>
                      Search by title
                      <Switch
                        style={{
                          marginLeft: 105,
                          paddingLeft: 20,
                          marginTop: 5
                        }}
                        onValueChange={(value) => this.setState({
                            eventSwitchTitle: value
                        })}
                        value={this.state.eventSwitchTitle}
                      />
                    </Text>
                  </View>

          			<TextInput
                    onChangeText={(text)=> this.setState({
                      searchQuery: text,
                      invalidValue: false
                    })}
                    value={this.state.searchQuery}
                    style={styles.loginInput}
                    placeholder="Search title">
                </TextInput>

                {validCtrl}

                <TouchableHighlight
                    onPress={this.onSearchPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>

                {errorCtrl}

                <ActivityIndicator
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                 />
            </View>
             </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginTop: 0
    },
    loginInput1: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: 'gray'
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: 'gray',
        alignSelf: 'stretch'
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
    welcome: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

module.exports = Search;
