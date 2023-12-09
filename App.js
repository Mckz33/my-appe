import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const OrderModel = {
  location: "",
  time: "",
  date: "",
  materials: [],
  total: 0,
  payment: "",
};

const BackendService = {
  getOrderData: async () => {
    try {
      const response = await fetch("http://localhost:3000/teste", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (!response.ok) {
        throw new Error("Network request failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
};


export default function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [orderData, setOrderData] = useState(OrderModel);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const addToOrder = (item) => {
    const updatedOrder = { ...orderData, materials: [...orderData.materials, item] };
    setOrderData(updatedOrder);
  };

  useEffect(() => {
    BackendService.getOrderData().then((data) => setOrderData(data));
  }, []);

  const renderInfoItem = (label, value) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      {/* ... (código existente) */}

      <ScrollView style={styles.infoSection}>
        {renderInfoItem("Local", orderData.location)}
        {renderInfoItem("Horário", orderData.time)}
        {renderInfoItem("Data", orderData.date)}
      </ScrollView>

      <ScrollView style={styles.infoSection}>
        {orderData.materials.map((material, index) => (
          <View key={index}>
            {renderInfoItem("Material", material.name)}
            {renderInfoItem("", `Quantidade: ${material.quantity}`)}
          </View>
        ))}
      </ScrollView>
      <Text style={styles.totalText}>{`Total R$ ${orderData.total}`}</Text>

      <ScrollView style={styles.infoSection}>
        {renderInfoItem("Pagamento Final", orderData.payment)}
      </ScrollView>

      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => addToOrder("Novo Item")}
      >
        <Text style={styles.buttonText}>Confirmar Coleta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2B463C",
    height: 100,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  menuItem: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  titleSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    padding: 10,
  },
  content: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    borderRadius: 20,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  greenBackground: {
    backgroundColor: "green",
  },
  greenButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  infoSection: {
    backgroundColor: "#F0F8FF",
    borderRadius: 20,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonSize: {
    marginTop: 10,
    height: 0,
  },
});
