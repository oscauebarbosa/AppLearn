import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';

import Header from "../components/Header"; 
import { FontAwesome6 } from "@expo/vector-icons";
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
    <ScrollView nestedScrollEnabled={true} style={css.container}>
      <View>
        <Header navigation={navigation} />

        <View style={css.calendarContainer}>
          <Calendar
            style={css.calendar}
            theme={{
              backgroundColor: '#fff',
              calendarBackground: '#fff',
              textSectionTitleColor: '#3C4043',
              selectedDayBackgroundColor: '#8C52FF',
              selectedDayTextColor: '#fff',
              todayTextColor: '#8C52FF',
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

          <ScrollView nestedScrollEnabled={true} style={css.feriadoScrollContainer}>
            <View style={css.feriadoContainer}>
              <View style={css.feriadoCard}>
                <View style={css.casinha}>
                  <FontAwesome6 name="house-chimney" size={24} color="black" />
                </View>
                <View style={css.feriadoBorda}>
                  <Text style={css.feriado}>Dia do Trabalhador</Text>
                  <Text style={css.feriadoData}>01/05/2024</Text>
                </View>
              </View>

              <View style={css.feriadoCard}>
                <View style={css.casinha}>
                  <FontAwesome6 name="house-chimney" size={24} color="black" />
                </View>
                <View style={css.feriadoBorda}>
                  <Text style={css.feriado}>Dia das Mães</Text>
                  <Text style={css.feriadoData}>12/05/2024</Text>
                </View>
              </View>

              <View style={css.feriadoCard}>
                <View style={css.casinha}>
                  <FontAwesome6 name="house-chimney" size={24} color="black" />
                </View>
                <View style={css.feriadoBorda}>
                  <Text style={css.feriado}>Corpus Christi</Text>
                  <Text style={css.feriadoData}>30/05/2024</Text>
                </View>
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
            <ScrollView nestedScrollEnabled={true} style={css.scrollContainer}>
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
    marginTop: -40,
    fontSize: 20,
    color: '#626576',
    fontWeight: 'bold',
    marginLeft: '7%',
    marginBottom: 15,
  },
  feriadoScrollContainer: {
    height: 160,
    width: 395, 
    marginLeft: 1,
    marginRight: 30,
  },
  feriadoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 0,
    width: '100%',
  },
  casinha: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    marginRight: 10, 
  },
  feriadoBorda: {
    flex: 1,
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
  feriadoContainer:{
    marginLeft: 30,
    marginRight: 30,
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
    fontSize: 43,
    color: '#fff',
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
    fontWeight: 'bold',
  },
  textoFulano2: {
    marginTop: 10,
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
  scrollContainer: {
    height: 300, 
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: 10,
    marginBottom: 10,
  },
  divLado: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    padding: 20,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'space-between',
    marginBottom: 10, 
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
    marginLeft: 100,
    width: 190,
    height: 80,
  },
});
