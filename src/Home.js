import {useEffect, useState, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import ListData from './components/ListData';
import Loader from './components/Loader';

export default function Home() {
  const [listData, setListData] = useState([
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    },
    {
      userId: 1,
      id: 3,
      title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
    },
    {
      userId: 1,
      id: 4,
      title: 'eum et est occaecati',
      body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
    },
    {
      userId: 1,
      id: 5,
      title: 'nesciunt quas odio',
      body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
    },
    {
      userId: 1,
      id: 6,
      title: 'dolorem eum magni eos aperiam quia',
      body: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
    },
    {
      userId: 1,
      id: 7,
      title: 'magnam facilis autem',
      body: 'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
    },
    {
      userId: 1,
      id: 8,
      title: 'dolorem dolore est ipsam',
      body: 'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',
    },
    {
      userId: 1,
      id: 9,
      title: 'nesciunt iure omnis dolorem tempora et accusantium',
      body: 'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas',
    },
    {
      userId: 1,
      id: 10,
      title: 'optio molestias id quia eum',
      body: 'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const memoizeListData = useMemo(() => {
    let processedData = listData.map(item => {
      return {
        id: item.id,
        title: item.title,
      };
    });
    return processedData;
  }, [listData]);

  const handleList = type => {
    if (type == 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (type == 'next' && listData.length > 0) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleCounter = type => {
    if (counter >= 1 && type == 'minus') {
      setCounter(counter - 1);
    } else if (type == 'plus') {
      setCounter(counter + 1);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10 `,
      )
      .then(res => {
        console.log('res list', res.data);
        setListData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err list', err);
        setIsLoading(false);
      });
  }, [currentPage]);
  return (
    <SafeAreaView style={styles.container}>
      <Loader isVisible={isLoading} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => handleList('prev')}
          style={[
            styles.btn,
            {
              backgroundColor: currentPage <= 1 ? '#cccccc' : '#ADD8E6',
            },
          ]}
          disabled={currentPage <= 1}>
          <Text style={styles.btnTxt}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleList('next')}
          style={[
            styles.btn,
            {
              backgroundColor: listData.length > 0 ? '#ADD8E5' : '#cccccc',
            },
          ]}
          disabled={!listData.length > 0}>
          <Text style={styles.btnTxt}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCounter('minus')}
          style={[
            styles.btn,
            {
              backgroundColor: counter > 0 ? '#ADD8E5' : '#cccccc',
            },
          ]}
          disabled={counter <= 0}>
          <Text style={styles.btnTxt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.btnTxt}>{counter}</Text>

        <TouchableOpacity
          onPress={() => handleCounter('plus')}
          style={styles.btn}
          disabled={!listData.length > 0}>
          <Text style={styles.btnTxt}>+</Text>
        </TouchableOpacity>
      </View>

      <ListData data={memoizeListData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  btn: {
    backgroundColor: '#ADD8E6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 10,
  },
  btnTxt: {
    fontWeight: 'bold',
  },
});
