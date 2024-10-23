import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { CreditCard, Wallet } from 'lucide-react-native';
import { saveTransaction, fetchTransactions} from '../store/slices/transactionService';
const BANK_INFO = {
  accountNo: "6504001775",      
  accountName: "TONG DUY TUAN",  
  acqId: "970418",              
};

export default function PaymentModal({ visible, onClose, user, services = [] }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const total = services.reduce((sum, service) => sum + service.price, 0);
  const description = `Pay Service`;

  const qrUrl = `https://api.vietqr.io/image/${BANK_INFO.acqId}-${BANK_INFO.accountNo}-qr_only.jpg?amount=${total}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

  const handlePayment = async () => {
    if (!paymentMethod || isProcessing) return;    
    setIsProcessing(true);    
    try {
      const transactionData = {
        userId: user.id,
        userName: user.name,
        services,
        total,
        paymentMethod,
        timestamp: new Date().toISOString(),
        }; 
      await saveTransaction(transactionData);    
      onClose();
      setPaymentMethod(null);
    } catch (error) {
      console.error('Error processing payment:', error);     
    } finally {
      setIsProcessing(false);
    }
  };
  

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Chi tiết thanh toán</Text>
              
              <Text style={styles.userName}>Khách hàng: {user?.name}</Text>
              
              <View style={styles.serviceList}>
                {services.map(service => (
                  <View key={service.id} style={styles.serviceItem}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.servicePrice}>{service.price.toLocaleString('vi-VN')}đ</Text>
                  </View>
                ))}
              </View>
              
              <Text style={styles.total}>Tổng cộng: {total.toLocaleString('vi-VN')}đ</Text>
              
              <View style={styles.paymentMethods}>
                <Text style={styles.paymentTitle}>Chọn phương thức thanh toán:</Text>
                <View style={styles.paymentButtons}>
                  <TouchableOpacity 
                    style={[styles.paymentButton, paymentMethod === 'cash' && styles.selectedPayment]}
                    onPress={() => setPaymentMethod('cash')}
                  >
                    <Wallet size={24} color={paymentMethod === 'cash' ? '#fff' : '#000'} />
                    <Text style={[styles.paymentButtonText, paymentMethod === 'cash' && styles.selectedPaymentText]}>Tiền mặt</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.paymentButton, paymentMethod === 'transfer' && styles.selectedPayment]}
                    onPress={() => setPaymentMethod('transfer')}
                  >
                    <CreditCard size={24} color={paymentMethod === 'transfer' ? '#fff' : '#000'} />
                    <Text style={[styles.paymentButtonText, paymentMethod === 'transfer' && styles.selectedPaymentText]}>Chuyển khoản</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {paymentMethod === 'transfer' && (
                <>
                  <View style={styles.bankInfo}>
                    <Text style={styles.bankName}>BIDV Bank</Text>
                    <Text>STK: {BANK_INFO.accountNo}</Text>
                    <Text>Chủ TK: {BANK_INFO.accountName}</Text>
                  </View>
                  
                  <View style={styles.qrContainer}>
                    <Image
                      source={{ uri: qrUrl }}
                      style={styles.qrImage}
                      resizeMode="contain"
                    />
                  </View>
                </>
              )}
            </ScrollView>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.confirmButton, !paymentMethod && styles.disabledButton]}
                onPress={handlePayment}
                disabled={!paymentMethod}
              >
              <Text style={styles.buttonText}>
                  {isProcessing ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
                disabled={isProcessing}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userName: {
    fontSize: 18,
    marginBottom: 15,
  },
  serviceList: {
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  serviceName: {
    fontSize: 16,
    flex: 1,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'right',
  },
  paymentMethods: {
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '48%',
  },
  selectedPayment: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  paymentButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  selectedPaymentText: {
    color: '#fff',
  },
  bankInfo: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});