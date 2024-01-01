import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
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
        <View style={styles.commentView2}>

          <View style={{flex:3, borderWidth:1, marginRight:10, borderRadius:7, backgroundColor:"#fff"}}>
            <TextInput style={styles.commentInput} />
          </View>

          <View style={{flex:1, borderRadius:7, backgroundColor:"#6F70FF"}}>
            <TouchableOpacity style={styles.commentButton}>
              <TextInput  multiline={true} style={{textAlign:"center", color:"#fff", fontSize:16, height:60}}>Send</TextInput>
            </TouchableOpacity>
          </View>
          
          
        </View>
        
      {comments.map((comment, index) => renderComment(comment.user_name, comment.content, index))}
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
    const { prop } = this.props;

    console.log('Prop value:', prop);
    
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
  },
  commentView2:{
    flexDirection:"row",
    width:"85%",
    marginVertical:10

  },
  commentInput:{
    height:50
  },
  commentButton:{
    height:50,
    justifyContent: 'center',
  }
});