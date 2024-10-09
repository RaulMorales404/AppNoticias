import React, {useState, } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Animated,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Cart} from '@components/carts/Cart';
import {Article} from '../../services/interfaces/articlesInterface';
import {FilterButton} from '@components/filters/FilterButton';
import {styles} from './stylesHome';
import {LoadingCardArticles} from '@components/loadings/LoadingAcrdsArticles';
import {saveNewArticle} from '@services/localStorage/SaveArticlesStorage';
import {useStore} from '@store/useStore';

const Home = () => {
  const {articles,isLoading,getArticles,isRefresh} = useStore();
  
  const [likedArticle, setLikedArticle] = useState<{[key: string]: boolean}>(
    {},
  );
 
  
  const onRefresh = async () => {
    const setIsRefresh = true;
    getArticles(8,setIsRefresh);
  };

  const getMoreArticles = ()=>{
    const page = articles.length+9;
    const showEasyLoad = false;
    const setIsRefresh = false;
    getArticles(page,setIsRefresh,showEasyLoad);
  }

  const clickLikedArticle = async (idArticle: string, data: Article) => {
    setLikedArticle(prevState => ({
      ...prevState,
      [idArticle]: !prevState[idArticle],
    }));
    await saveNewArticle(data);
  };

  
  // Usar useCallback para memorizar renderItem y evitar renders innecesarios
  const renderItem = ({item}: {item: Article}) => {
    return (
      <Cart data={item} action={clickLikedArticle} stateLiked={likedArticle} />
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
        <View style={{marginLeft: 10, marginBottom: 10}}>
          <Text style={styles.titleHeader}>News App</Text>
        </View>
        <FilterButton />
        {!isLoading && (
          <Animated.FlatList
            data={articles}
            ListHeaderComponent={<View style={{paddingBottom: 20}} />}
            refreshControl={
              <RefreshControl
                style={{marginBottom: 10}}
                refreshing={isRefresh}
                onRefresh={onRefresh}
                colors={['#2CB3FC']} // Colores para Android
                tintColor="#2CB3FC" // Color para iOS
              />
            }
            renderItem={renderItem}
            style={{backgroundColor: 'white'}}
            ListFooterComponent={
              <View style={{ height: 150, justifyContent: 'center' }}>
                  <ActivityIndicator color={'#2CB3FC'} size={50}/>
              </View>

          }
            renderToHardwareTextureAndroid
            ItemSeparatorComponent={() => <View style={{height: 0}} />}
            keyExtractor={(item, index) => item.title + index}
            scrollEventThrottle={16}
            onEndReached={getMoreArticles}
            onEndReachedThreshold={0.6}

          />
        )}
        {isLoading && <LoadingCardArticles />}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
