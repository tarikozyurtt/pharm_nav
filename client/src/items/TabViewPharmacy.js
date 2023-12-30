import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const comments = [
  { user_name: 'Ali C.', content: 'It is a long established fact that a reader will be distracted by the readable content of a page.' },
  { user_name: 'Mehmet S.', content: 'It is a long established fact.' },
  // Add more comments as needed
];

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

const FirstRoute = () => (
  <View style={styles.scene} >
    <Text style={styles.description}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
      ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
      not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in 
      the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
      software like Aldus PageMaker including versions of Lorem Ipsum.
    </Text>
  </View>
);
const SecondRoute = () => (
  <View style={styles.scene} >
    <ScrollView style={{width:"100%"}}>
      <View style={styles.scrollView}>
      {comments.map((comment, index) => renderComment(comment.user_name, comment.content, index))}
        {/* <View style={styles.commentView}>
          <Text style={styles.commentName}>
            Emre Y.
          </Text>
          <Text style={styles.commentText}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            The point of using Lorem Ipsum is that it 
          </Text>
        </View>

        <View style={styles.commentView}>
          <Text style={styles.commentName}>
            Ali C.
          </Text>
          <Text style={styles.commentText}>
            It is a long established fact that a reader will be distracted by the readable content of a page.
          </Text>
        </View>

        <View style={styles.commentView}>
          <Text style={styles.commentName}>
            Mehmet S.
          </Text>
          <Text style={styles.commentText}>
            It is a long established fact.
          </Text>
        </View>

        <View style={styles.commentView}>
          <Text style={styles.commentName}>
            Fatma Y.
          </Text>
          <Text style={styles.commentText}>
            It is a long established fact that a reader will be distracted by the readable content of a page.
          </Text>
        </View>

        <View style={styles.commentView}>
          <Text style={styles.commentName}>
            Ayşe C.
          </Text>
          <Text style={styles.commentText}>
            It is a long established fact that a reader will be distracted by the readable content of a page story page match comics.
          </Text>
        </View>

        <View style={styles.commentView}>
          <Text style={styles.commentName}>
            Ahmet C.
          </Text>
          <Text style={styles.commentText}>
            It is a long established fact that a reader.
          </Text>
        </View> */}


      </View>
      
    </ScrollView>
  </View>
);
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
    return (
      <TabView
        renderTabBar={renderTabBar}
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
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
    marginTop:20
  },
  scene: {
    width: "100%",
    height: "100%",
  },
  description:{
    textAlign:"center",
    paddingVertical:20,
    paddingHorizontal:15,
    fontSize:15
  },
  commentView:{
    width:"85%",
    alignSelf: 'auto',
    borderRadius:4,
    marginVertical:5,
    backgroundColor:"#6F70FF"
  },
  scrollView:{
    width:"100%",
    alignItems: 'center',
  },
  commentName:{
    fontWeight:"bold",
    marginLeft:7, 
    marginVertical:5,
    color:"#FFFFFF"
  },
  commentText:{
    paddingHorizontal:7,
    paddingBottom:5,
    color:"#FFFFFF"
  }
});