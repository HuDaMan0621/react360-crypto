import React from 'react';
import {
  asset,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-360';
import Entity from 'Entity';

export default class CryptoModel extends React.Component {
  render() {
    return (
      <View>
        <Entity
          style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }, { scaleZ: 1 }, { rotateX: 90 }] }}
          source={{ obj: asset('models/model.obj') }}
        />
      </View>
    );
  }
};

class LeftPanel extends React.Component {
  state = {
    cryptocurrency: {
      open: '',
      close: '',
      high: '',
      low: '',
      volumefrom: '',
      volumeto: '',
    }
  }
  //     "time": 1591401600,
  //     "close": 9671.46,
  //     "high": 9728.4,
  //     "low": 9536.15,
  //     "open": 9622.02,
  //     "volumefrom": 22979.04,
  //     "volumeto": 221180782.78


  componentDidMount() {
    fetch('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD')
      .then(response => response.json())
      .then(data => {
        this.setState({
          cryptocurrency: {
            open: data["Data"][30]["open"],
            close: data["Data"][30]["close"],
            high: data["Data"][30]["high"],
            low: data["Data"][30]["low"],
            volumefrom: data["Data"][30]["volumefrom"],
            volumeto: data["Data"][30]["volumeto"],
          }
        });
      })
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.textSize}>Crypto </Text>
        </View>
        <Text>Price Statistics</Text>
          <Text>High: {this.state.cryptocurrency.high}</Text>
          <Text>Low: {this.state.cryptocurrency.low}</Text>
          <Text>Open: {this.state.cryptocurrency.open}</Text>
          <Text>Close: {this.state.cryptocurrency.close}</Text>
          <Text>Volume From: {this.state.cryptocurrency.volumefrom}</Text>
          <Text>Volume To: {this.state.cryptocurrency.volumeto}</Text>
      </View>
    )
  }
}

class RightPanel extends React.Component {
  componentDidMount() {
    fetch(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=BTC&tsym=USD&api_key=befecbf5f7680ca7fd97141f169838be40d53490fd776cc7180b1483b228267d`)
    .then(response => response.json()) 
    .then(data => this.setState({
      cryptoData: {
        symbol: data["Data"][0]["CoinInfo"]["Name"],
  //TODO  algorithm: data["Data"][0]["CoinInfo"]["Name"],
        symbol: data["Data"][0]["CoinInfo"]["Name"],
        symbol: data["Data"][0]["CoinInfo"]["Name"],
        symbol: data["Data"][0]["CoinInfo"]["Name"],
        symbol: data["Data"][0]["CoinInfo"]["Name"],
      }
    }))
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapper}>
          <Text style={styles.textSize}>Information </Text>
        </View>
        <View>
         
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    height: 600,
    backgroundColor: '#00171F',
    borderColor: '#003459',
    borderWidth: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 10
  },
  header: {
    backgroundColor: '#003459'

  },
  textSize: {
    fontSize: 30,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('LeftPanel', () => LeftPanel);
AppRegistry.registerComponent('RightPanel', () => RightPanel);
AppRegistry.registerComponent('CryptoModel', () => CryptoModel);
