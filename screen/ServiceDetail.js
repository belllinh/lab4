// First, modify your ServiceDetail component to expose the menu functionality
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Menu, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { deleteServiceFromFirestore } from '../store/slices/serviceSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EllipsisVertical } from 'lucide-react-native';


const ServiceDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { serviceId } = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const service = useSelector((state) =>
    state.service.services.find((s) => s.id === serviceId)
  );

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa dịch vụ này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setLoading(true);
            dispatch(deleteServiceFromFirestore(serviceId));
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  }, [serviceId, dispatch, navigation]);

  const handleUpdate = useCallback(() => {
    navigation.navigate('AddNewService', { serviceId });
  }, [navigation, serviceId]);

  // Set up header right button with menu
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightMenu onUpdate={handleUpdate} onDelete={handleDelete} />
      ),
    });
  }, [navigation, handleUpdate, handleDelete]);

  if (!service) {
    return (
      <View style={styles.centered}>
        <Title>Không tìm thấy dịch vụ</Title>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{service.name}</Title>
          <Paragraph style={styles.paragraph}>Mô tả: {service.description}</Paragraph>
          <Paragraph style={styles.paragraph}>
            Giá: {service.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </Paragraph>
          <Paragraph style={styles.paragraph}>Người tạo: {service.creator}</Paragraph>
          <Paragraph style={styles.paragraph}>
            Thời gian: {service.time ? new Date(service.time).toLocaleString('vi-VN') : 'N/A'}
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            Cập nhật cuối: {service.finalUpdate ? new Date(service.finalUpdate).toLocaleString('vi-VN') : 'N/A'}
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

// Header Right Menu Component
const HeaderRightMenu = ({ onUpdate, onDelete }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <EllipsisVertical          
          size={24}
          color='black'
          onPress={() => setMenuVisible(true)}
        />
      }
    >
      <Menu.Item
        onPress={() => {
          setMenuVisible(false);
          onUpdate();
        }}
        title="Cập nhật"        
      />
      <Menu.Item
        onPress={() => {
          setMenuVisible(false);
          onDelete();
        }}
        title="Xóa"       
        titleStyle={{ color: '#f50062' }}
      />
    </Menu>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});

export default ServiceDetail;