import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const addRating = async (body) => {
  return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/addrating', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body,
  });
};

const addComment = async (body) => {
  return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/addcomment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body,
  });
};

const renderComment = (user_name, content, commentNumber) => (
  <View style={styles.commentView} key={commentNumber}>
    <Text style={styles.commentName}>
      {user_name}
    </Text>
    <Text style={styles.commentText}>
      {content}
    </Text>
  </View>
);

const handleShowInMap = (prop) => {
  console.log('maps:', prop.location);
  prop.navigation.navigate("Map", prop.location)
};

const FirstRoute = (props) => (
  <View style={styles.scene} >
    <Text style={styles.description}>
      {props?.prop?.description}
    </Text>
    <TouchableOpacity onPress={() => handleShowInMap(props.prop)}>
        <View style={styles.mapButton}>
          <Text style={styles.addratingtext}>Show in map</Text>
        </View>
      </TouchableOpacity>
  </View>
);

const SecondRoute = (props) => {
  const [commentInput, setCommentInput] = useState('');
  const [comms, setComms] = useState(props?.prop?.comments)
  const [isLoading, setIsLoading] = useState(false);

  const handleAddRatingPress = () => {
    // open popup give rating call service
    console.log("rating -> ", props.prop.pharmId)
    // setIsLoading(true);
    // addComment(JSON.stringify({ pharmId: props.prop.pharmId, comment: commentInput, patientId: props.prop.userId }))
    //   .then(async prop => {
    //     const result = await prop.json()
    //     console.log("add comment res: ", result)
    //     setComms(result?.pharmacyData)
    //     Alert.alert("Successfull!", "Your comment have been posted.")
    //   })
    //   .catch(error => {
    //     Alert.alert('An Error Occured!', "Please try again.");
    //   })
    //   .finally(() => {
    //     setCommentInput('');
    //     setIsLoading(false);
    // });

  };

  const handleSendButtonPress = () => {
    console.log('Comment Input:', commentInput);
    setIsLoading(true);

    addComment(JSON.stringify({ pharmId: props.prop.pharmId, comment: commentInput, patientId: props.prop.userId }))
      .then(async prop => {
        const result = await prop.json()
        console.log("add comment res: ", result)
        setComms(result?.pharmacyData)
        Alert.alert("Successfull!", "Your comment have been posted.")
      })
      .catch(error => {
        Alert.alert('An Error Occured!', "Please try again.");
      })
      .finally(() => {
        setCommentInput('');
        setIsLoading(false);
    });
  };

  return (
    <View style={styles.scene}>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.scrollView}>
          <View style={styles.commentView2}>
            <View style={{ flex: 3, borderWidth: 1, marginRight: 10, borderRadius: 7, backgroundColor: '#fff' }}>
              <TextInput
                multiline={true}
                style={styles.commentInput}
                value={commentInput}
                onChangeText={(text) => setCommentInput(text)}
              />
            </View>
            {!isLoading ? (
            <View style={{ flex: 1, borderRadius: 7, backgroundColor: '#6F70FF' }}>
              <TouchableOpacity style={styles.commentButton} onPress={handleSendButtonPress}>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16 }}>Send</Text>
              </TouchableOpacity>
            </View>
            ) : (
              <View style={{ flex: 1, borderRadius: 7, backgroundColor: '#6F70FF' }}>
                <TouchableOpacity style={styles.commentButton}>
                  <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16 }}>Sending..</Text>
                </TouchableOpacity>
              </View>
              )}
          </View>

          {comms?.map((comment, index) => renderComment(comment.user_name, comment.content, index))}
        </View>
      </ScrollView>

      <TouchableOpacity onPress={handleAddRatingPress}>
        <View style={styles.butonCont}>
          <Text style={styles.addratingtext}>Add Rating</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#6F70FF' }}
  />
);

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Description' },
      { key: 'second', title: 'Comment' },
    ],
  };

  render() {
    const { prop } = this.props;

    // console.log('Prop value:', prop);

    return (
      <TabView
        renderTabBar={renderTabBar}
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => <FirstRoute prop={prop} />,
          second: () => <SecondRoute prop={prop} />,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  scene: {
    width: "100%",
    height: "100%"
  },
  description: {
    textAlign: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    fontSize: 15
  },
  commentView: {
    width: "85%",
    alignSelf: 'auto',
    borderRadius: 4,
    marginVertical: 5,
    backgroundColor: "#6F70FF"
  },
  scrollView: {
    width: "100%",
    alignItems: 'center',
  },
  commentName: {
    fontWeight: "bold",
    marginLeft: 7,
    marginVertical: 5,
    color: "#FFFFFF"
  },
  commentText: {
    paddingHorizontal: 7,
    paddingBottom: 5,
    color: "#FFFFFF"
  },
  commentView2: {
    flexDirection: "row",
    width: "85%",
    marginVertical: 10

  },
  commentInput: {
    height: 50
  },
  commentButton: {
    height: 50,
    justifyContent: 'center'
  },
  butonCont: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFFFFF', // or any other color you prefer
    borderRadius: 10,
    padding: 10,
  },
  mapButton: {
    position: 'absolute',
    top: 270,
    right: 30,
    backgroundColor: '#FFFFFF', // or any other color you prefer
    borderRadius: 10,
    padding: 15,
  },
  addratingtext: {
    color: '#6F70FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});