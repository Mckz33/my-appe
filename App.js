import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const addToOrder = (item) => {
    setOrders([...orders, item]);
  };

  // Função para renderizar um item com rótulo e valor
  const renderInfoItem = (label, value) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name={isMenuOpen ? "times" : "bars"} size={30} color="#fff" />
        </TouchableOpacity>

        {isMenuOpen && (
          <View>
            <TouchableOpacity onPress={() => alert("Menu Item 1")}>
              <Text style={styles.menuItem}>Item 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("Menu Item 2")}>
              <Text style={styles.menuItem}>Item 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("Menu Item 3")}>
              <Text style={styles.menuItem}>Item 3</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView
        style={[styles.titleSection, styles.greenBackground, styles.buttonSize]}
      >
        <Text style={styles.heading}>Resumo do Pedido</Text>
      </ScrollView>

      <ScrollView style={styles.infoSection}>
        {renderInfoItem("Local", "Nome do Local")}
        {renderInfoItem("Horário", "14:00")}
        {renderInfoItem("Data", "01/12/2023")}
      </ScrollView>

      <ScrollView style={styles.infoSection}>
        {renderInfoItem("Material ", " Vidro 4k")}
        {renderInfoItem("", " Plástico 8kg")}
      </ScrollView>
      <Text style={styles.totalText}>Total R$ 8,00</Text>
      <ScrollView style={styles.infoSection}>
        {renderInfoItem("Pagamento Final", "5678")}
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
