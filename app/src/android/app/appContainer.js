//'use strict';

import React, {Component} from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Search from '../search/search';
import SearchResults from '../search/searchResults';

import Movies from '../movies/movies';

class AppContainer extends Component {
	constructor(props) {
		super(props);		
		
        App = {
            movies: {
                refresh: false
            }
        };		
	}
	
	render() {
		return (
			<ScrollableTabView>
				<SearchTab tabLabel="Search" />
				<MoviesTab tabLabel="Movies" />
			</ScrollableTabView>
		);
	}
}

class SearchTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Search', index: 0},
			{title: 'Search Results', index: 1},
			{title: 'Phones Details', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Search routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <SearchResults data={route.data} routes={this.routes} navigator={navigator} />
					break;			
			case 2: return <Search data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
			initialRoute={this.routes[0]}
			initialRouteStack={this.routes}
		    renderScene={this.renderScene.bind(this)}
			style={{padding: 0}}
		  
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.PushFromRight}
		/>
		)
	}
}

class MoviesTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Movies', index: 0},
			{title: 'Movies Details', index: 1}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Movies routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <Movies data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
			initialRoute={this.routes[0]}
			initialRouteStack={this.routes}
		    renderScene={this.renderScene.bind(this)}
			style={{padding: 0}}
		  
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.PushFromRight}
		/>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});

module.exports = AppContainer;
