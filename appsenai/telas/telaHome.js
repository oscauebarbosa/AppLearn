import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';

// Certifique-se de ajustar o caminho conforme a localização real do Header.js
import Header from "../components/Header"; 
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ],
  dayNames: [
    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};
LocaleConfig.defaultLocale = 'fr';

export default function ({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const adicionarViagem = (dataInicio) => {
    setSelectedDate(dataInicio);
  };

  return (
    <ScrollView style={css.container}>
      <View>
        <Header navigation={navigation} />

        <View style={css.calendarContainer}>
          <Calendar
            style={css.calendar}
            theme={{
              backgroundColor: '#fff',
              calendarBackground: '#fff',
              textSectionTitleColor: '#3C4043',
              selectedDayBackgroundColor: '#000',
              selectedDayTextColor: '#fff',
              todayTextColor: '#000',
              dayTextColor: '#000',
              textDisabledColor: '#b5b5b5',
              arrowColor: '#3C4043',
              monthTextColor: '#000',
              textMonthFontWeight: 'bold',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textMonthFontSize: 18,
            }}
            onDayPress={(day) => {
              if (!selectedDate) {
                adicionarViagem(day.dateString, null);
              } else {
                setSelectedDate(null);
              }
            }}
            markedDates={{
              [selectedDate]: { selected: true },
              '2024-05-13': { marked: true, dotColor: '#000' },
              '2024-05-14': { marked: true, dotColor: '#000' }
            }}
          />
        </View>

        <View>
          <Text style={css.feriadosTitulo}>Feriados e imendas:</Text>

          <ScrollView style={css.scrollContainer} contentContainerStyle={css.scrollContent}>
            <View style={css.viewFeriados}>
              <View style={css.casinha}>
                <FontAwesome6 name="house-chimney" size={24} color="black" />
              </View>
              <View style={css.feriadoBorda}>
                <Text style={css.feriado}>Dia do Trabalho e Trabalhador</Text>
                <Text style={css.feriadoData}>01/05/2024</Text>
              </View>
            </View>

            <View style={css.viewFeriados}>
              <View style={css.casinha}>
                <FontAwesome6 name="house-chimney" size={24} color="black" />
              </View>
              <View style={css.feriadoBorda}>
                <Text style={css.feriado}>Dia do Trabalho e Trabalhador</Text>
                <Text style={css.feriadoData}>01/05/2024</Text>
              </View>
            </View>

            <View style={css.viewFeriados}>
              <View style={css.casinha}>
                <FontAwesome6 name="house-chimney" size={24} color="black" />
              </View>
              <View style={css.feriadoBorda}>
                <Text style={css.feriado}>Independência do Brasil</Text>
                <Text style={css.feriadoData}>07/09/2024</Text>
              </View>
            </View>

            <View style={css.viewFeriados}>
              <View style={css.casinha}>
                <FontAwesome6 name="house-chimney" size={24} color="black" />
              </View>
              <View style={css.feriadoBorda}>
                <Text style={css.feriado}>Proclamação da República</Text>
                <Text style={css.feriadoData}>15/11/2024</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={css.informacoes}>
        {selectedDate ? (
          <View>
            <Text style={css.textoFulano}>Cronograma</Text>
            <Text style={css.textoData}>{selectedDate}</Text>
            <ScrollView style={css.divInformacoes}>
              <View style={css.divLado}>
                <View>
                  <Text style={css.textoAula}>Python</Text>
                  <Text style={css.textoProfessor}>Prof° Bruno</Text>
                </View>
                <View>
                  <Text style={css.textoHorario}>15:00</Text>
                  <Text style={css.textoSala}>Sala 2</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View>
            <Text style={css.textoFulano}>Olá, Cauê Barbosa!</Text>
            <Text style={css.textoFulano2}>Confira seu cronograma selecionando o dia no calendário!</Text>
          </View>
        )}
        <Image style={css.logoBranca} source={require('../assets/logoCompBranca.png')} />
      </View>
    </ScrollView>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  calendar: {
    width: '90%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  feriadosTitulo: {
    fontSize: 20,
    color: '#626576',
    fontWeight: 'bold',
    marginLeft: '7%',
    marginBottom: 15,
  },
  scrollContainer: {
    height: 180, // Ajuste a altura conforme necessário
  },
  scrollContent: {
    paddingHorizontal: '7%',
  },
  viewFeriados: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 20,
  },
  casinha: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
  },
  feriadoBorda: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: "#fff",
  },
  feriado: {
    fontSize: 15,
    color: "#262A41",
    fontWeight: 'bold',
  },
  feriadoData: {
    color: "#9799A4",
  },
  informacoes: {
    backgroundColor: "#8C52FF",
    marginTop: 25,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingBottom: 70,
  },
  textoFulano: {
    fontSize: 40,
    color: '#fff',
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    fontWeight: 'bold',
  },
  textoFulano2: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  textoData: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 30,
    marginRight: 30,
  },
  divInformacoes: {
    margin: '8%',
  },
  divLado: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    padding: 20,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  textoAula: {
    fontSize: 40,
    color: '#7A7A7A',
    fontWeight: 'bold',
  },
  textoHorario: {
    fontSize: 40,
    color: '#8C52FF',
    fontWeight: 'bold',
  },
  textoProfessor: {
    fontSize: 20,
    color: '#7A7A7A',
    fontWeight: 'bold',
  },
  textoSala: {
    fontSize: 20,
    color: '#7A7A7A',
    marginLeft: '22%',
  },
  logoBranca: {
    marginTop: 50,
    marginLeft: '33%',
    width: 120,
    height: 60,
  },
});
