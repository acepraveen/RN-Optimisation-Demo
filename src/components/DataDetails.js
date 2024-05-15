import {useEffect, useState, useCallback, useMemo, memo} from 'react';

import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Loader from './Loader';

const DataDetails = memo(({id}) => {
  const [itemData, setIemData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getDetails = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        console.log('listDetails', res.data);
        setIemData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err listDetails', err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getDetails();
  }, [id]);

  const processedData = () => {
    console.time('details');
    let processedDetails = {
      body: itemData?.body,
    };
    console.timeEnd('details');
    return processedDetails;
  };

  const memoizeListDetails = useMemo(() => {
    return processedData();
  });

  return (
    <View style={styles.container}>
      <Loader isVisible={isLoading} />
      <View style={styles.details}>
        <Text style={styles.body}>{memoizeListDetails?.body}</Text>
      </View>
    </View>
  );
});

export default DataDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    marginLeft: 15,
    marginTop: 10,
  },
  body: {
    fontSize: 17,
    color: '#000000',
  },
});
