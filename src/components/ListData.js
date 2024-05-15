import {useEffect, useState, useCallback, useMemo, memo} from 'react';

import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import EmptyData from './EmptyData';
import DataDetails from './DataDetails';

const ListData = memo(({data}) => {
  const [currentId, setCurrentId] = useState();
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setCurrentId(item.id);
        }}>
        <Text style={styles.title}>
          {'( '}
          {item?.id}
          {' ) '}
          {item?.title}
        </Text>
        {currentId === item.id ? <DataDetails id={item.id} /> : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{margin: 10}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyData}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginTop: 11,
  },
  title: {
    fontSize: 18,
    color: '#000000',
  },
});

export default ListData;
