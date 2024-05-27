import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import Header from "../components/Header"; 
import { FontAwesome6 } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ],
  dayNames: [
    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};
LocaleConfig.defaultLocale = 'pt-br';

const holidays = [
  { name: 'Ano Novo', date: '2024-01-01' },
  { name: 'Aniversário de São Paulo', date: '2024-01-25' },
  { name: 'Carnaval', date: '2024-02-12' },
  { name: 'Carnaval', date: '2024-02-13' },
  { name: 'Quarta-feira de Cinzas', date: '2024-02-14' },
  { name: 'Sexta-feira Santa', date: '2024-03-29' },
  { name: 'Páscoa', date: '2024-03-31' },
  { name: 'Dia de Tiradentes', date: '2024-04-21' },
  { name: 'Dia do Trabalhador', date: '2024-05-01' },
  { name: 'Dia das Mães', date: '2024-05-12' },
  { name: 'Corpus Christi', date: '2024-05-30' },
  { name: 'Revolução Constitucionalista', date: '2024-07-09' },
  { name: 'Dia dos Pais', date: '2024-08-11' },
  { name: 'Independência do Brasil', date: '2024-09-07' },
  { name: 'Dia das Crianças', date: '2024-10-12' },
  { name: 'Nossa Senhora Aparecida', date: '2024-10-12' },
  { name: 'Finados', date: '2024-11-02' },
  { name: 'Proclamação da República', date: '2024-11-15' },
  { name: 'Consciência Negra', date: '2024-11-20' },
  { name: 'Natal', date: '2024-12-25' }
];

export default function MyComponent({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const adicionarViagem = (dataInicio) => {
    setSelectedDate(dataInicio);
  };

  const formataData = (data) => {
    const date = new Date(data);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  const filteredHolidays = holidays.filter(holiday => {
    const [year, month] = holiday.date.split('-');
    return parseInt(month, 10) === selectedMonth && parseInt(year, 10) === selectedYear;
  });

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <View>
        <Header navigation={navigation} />

        <View style={styles.calendarContainer}>
          <Calendar
            style={styles.calendar}
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
                adicionarViagem(day.dateString);
              } else {
                setSelectedDate(null);
              }
            }}
            onMonthChange={(month) => {
              setSelectedMonth(month.month);
              setSelectedYear(month.year);
            }}
            markedDates={{
              [selectedDate]: { selected: true },
              '2024-05-13': { marked: true, dotColor: '#000' },
              '2024-05-14': { marked: true, dotColor: '#000' }
            }}
          />
        </View>

        <View>
          <Text style={styles.feriadosTitulo}>Feriados e imendas:</Text>

          <ScrollView nestedScrollEnabled={true} style={styles.feriadoScrollContainer}>
            <View style={styles.feriadoContainer}>
              {filteredHolidays.length > 0 ? (
                filteredHolidays.map((holi, index) => (
                  <View style={styles.feriadoCard} key={index}>
                    <View style={styles.casinha}>
                      <FontAwesome6 name="house-chimney" size={24} color="black" />
                    </View>
                    <View style={styles.feriadoBorda}>
                      <Text style={styles.feriado}>{holi.name}</Text>
                      <Text style={styles.feriadoData}>{formataData(holi.date)}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.feriadoCard}>
                  <View style={styles.casinha}>
                    <FontAwesome6 name="house-chimney" size={24} color="black" />
                  </View>
                  <View style={styles.feriadoBorda}>
                    <Text style={styles.feriado}>Nesse mês não há feriados</Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={styles.informacoes}>
        {selectedDate ? (
          <View>
            <Text style={styles.textoFulano}>Cronograma</Text>
            <Text style={styles.textoData}>{formataData(selectedDate)}</Text>
            <ScrollView nestedScrollEnabled={true} style={styles.scrollContainer}>
              <View style={styles.divLado}>
                <View>
                  <Text style={styles.textoAula}>Python</Text>
                  <Text style={styles.textoProfessor}>Prof° Bruno</Text>
                </View>
                <View>
                  <Text style={styles.textoHorario}>15:00</Text>
                  <Text style={styles.textoSala}>Sala 2</Text>
                </View>
              </View>
              
              <View style={styles.divLado}>
                <View>
                  <Text style={styles.textoAula}>Python</Text>
                  <Text style={styles.textoProfessor}>Prof° Bruno</Text>
                </View>
                <View>
                  <Text style={styles.textoHorario}>15:00</Text>
                  <Text style={styles.textoSala}>Sala 2</Text>
                </View>
              </View>

              <View style={styles.divLado}>
                <View>
                  <Text style={styles.textoAula}>Python</Text>
                  <Text style={styles.textoProfessor}>Prof° Bruno</Text>
                </View>
                <View>
                  <Text style={styles.textoHorario}>15:00</Text>
                  <Text style={styles.textoSala}>Sala 2</Text>
                </View>
              </View>

              <View style={styles.divLado}>
                <View>
                  <Text style={styles.textoAula}>Python</Text>
                  <Text style={styles.textoProfessor}>Prof° Bruno</Text>
                </View>
                <View>
                  <Text style={styles.textoHorario}>15:00</Text>
                  <Text style={styles.textoSala}>Sala 2</Text>
                </View>
              </View>

              <View style={styles.divLado}>
                <View>
                  <Text style={styles.textoAula}>Python</Text>
                  <Text style={styles.textoProfessor}>Prof° Bruno</Text>
                </View>
                <View>
                  <Text style={styles.textoHorario}>15:00</Text>
                  <Text style={styles.textoSala}>Sala 2</Text>
                </View>
              </View>

              <View style={styles.divLado}>
                <View>
                  <Text style={styles.textoAula}>Python</Text>
                  <Text style={styles.textoProfessor}>Prof° Bruno</Text>
                </View>
                <View>
                  <Text style={styles.textoHorario}>15:00</Text>
                  <Text style={styles.textoSala}>Sala 2</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View>
            <Text style={styles.textoFulano}>Olá, Cauê Barbosa!</Text>
            <Text style={styles.textoFulano2}>Confira seu cronograma selecionando o dia no calendário!</Text>
          </View>
        )}
        <Image style={styles.logoBranca} source={require('../assets/logoCompBranca.png')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    padding: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  feriadoBorda: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: "#fff",
  },
  feriadoContainer: {
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
