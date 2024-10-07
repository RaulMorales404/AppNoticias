import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import Trend from '@components/trend/Trend';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScreenRouteStackProp} from 'navigation/HomeStackNavigation';
import {useFormatDate} from '@components/hooks/useFormatDate';
import {IconArroLeft, IconLike, IconLikeFull} from '@assets/icons-svgs';
import { Article } from '@services/interfaces/articlesInterface';
import { saveNewArticle } from '@services/localStorage/SaveArticlesStorage';
import { FadeInImage } from '@components/fade/FadeInImage';

const Details = () => {
  const navigation = useNavigation();
  const getDataRoute = useRoute<ScreenRouteStackProp>();
  const {formattedDate} = useFormatDate();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isSelected,setIsSelected] = useState<{[key:string]:boolean}>({})
 
  const dataDetails: Article = getDataRoute.params?.dataDetails || {
    source: {id: '', name: ''},
    author: '',
    title: '',
    description: '',
    url: '',
    urlToImage: '',
    publishedAt: '',
    content: '',
    isLiked:false,
  };
 
const [likedArticle,setLikeArticle] =useState<boolean>(dataDetails.isLiked?dataDetails.isLiked:false)
  
const clickLiked = async ()=>{
    setLikeArticle(!likedArticle)
    await saveNewArticle(dataDetails);
  }

  

  

  const detailsTrend = (item: string, data: Article)=>{
    console.log(item)
   setIsSelected((prevState)=>({
    ...prevState,
    [item]:!prevState[item],

   }))
  }

  useEffect(() => {
    if(dataDetails){
      setLikeArticle(dataDetails.isLiked);
    }
   
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [dataDetails]);
 
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}  ref={scrollViewRef}>
      <SafeAreaView>
        <View>
          
          <FadeInImage uri={dataDetails.urlToImage} styles={styles.img}/>

          <View style={[styles.containerIconBack, {backgroundColor: 'black'}]}>
            <TouchableOpacity
              style={styles.buttonGoBack}
              onPress={() => navigation.goBack()}>
              <IconArroLeft color={'#fff'} />
            </TouchableOpacity>
          </View>

          <View style={[  styles.containerIconSave]}>
          
          <View style={{position: 'absolute', bottom: -2, right: 1}}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 100,
            }}
            onPress={() =>clickLiked()}>
            {likedArticle? (
              <IconLikeFull
                color="#2ba8eb"
                secColor="#fff"
                width={30}
                height={30}
              />
            ) : (
              <IconLike color="#6a6a6a" width={30} height={30} />
            )}
          </TouchableOpacity>
        </View>
          </View>
          
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.titleText}>{dataDetails.title}</Text>
          <View style={styles.containerAuthor}>
            <View style={styles.containerAuthor}>
              <Image
                source={{uri: dataDetails.urlToImage}}
                style={styles.imgAuthor}
              />
              <Text numberOfLines={1} ellipsizeMode="clip"   style={styles.authorText}>{dataDetails.author}</Text>
            </View>

            <View style={styles.continerPublished}>
              <Text style={styles.publishedAtText}>
                {formattedDate(dataDetails.publishedAt)}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.descText}>{dataDetails.description}</Text>
            <Text style={styles.descText}>{dataDetails.content}</Text>
          </View>
        </View>
       <Trend likedArticles={isSelected} actionLike={detailsTrend} /> 
      </SafeAreaView>
    </ScrollView>
  );
};

export default Details;
