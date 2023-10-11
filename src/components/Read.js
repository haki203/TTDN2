/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
const backgroundColor1 = '#FDFDFD';
const headerNameBoColorBo = '#272956';
const headerNameBoColorAu = '#9D9D9D';
const noidungColor = '#9D9D9D';
const Read = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/ic_left.png')} />
        <View style={styles.header_Name}>
          <Text style={styles.header_Name_Bo}>Catcher in the Rye</Text>
          <Text style={styles.header_Name_Au}>J.D. Salinger</Text>
        </View>
        <TouchableOpacity >
          <Image source={require('../assets/images/ic_3cham.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.body}>
        <Text style={styles.body_NoiDung}>
          Pencey is Holden’s fourth school; he has already failed out of three
          others.At Pencey, he has failed four out of five of his classes and
          has received notice that he is being expelled, but he is not scheduled
          to return home to Manhattan until Wedne-sday. He visits his elderly
          history teacher, Spencer, to say goodbye, but when Spencer tries to
          reprimand him for his poor academic perfo rm ance, Holden becomes
          annoyed. Back in the dorm itory, Holden is further irritated by his
          unhygienic neighbor, Ackley, and by his own roommate, Strad later.
          Stradlater spends the evening on a date with Jane Gallagher, a girl
          whom Holden used to date and whom he still admires. During the course
          of the evening, Holden grows increasingly nervous about Stradlater ’s
          taking Jane out, and when Stradlater returns, Holden questions him
          insist ently about whether he tried to have sex with her. Stradlater
          teases Holden, who flies into a rage and attacks Stradlater.
          Stradlater pins Holden down and bloodies his nose. Holden decides that
          he’s enough of Pencey and will goand bloodies his nose.Holden decides
          that he’s enough of Pencey and will go and bloodies his nose. Holden
          decides that he’s enough of Pencey and will go Pencey is Holden’s
          fourth school; he has already failed out of three others.At Pencey, he
          has failed four out of five of his classes and has received notice
          that he is being expelled, but he is not scheduled to return home to
          Manhattan until Wedne-sday. He visits his elderly history teacher,
          Spencer, to say goodbye, but when Spencer tries to reprimand him for
          his poor academic perfo rm ance, Holden becomes annoyed. Back in the
          dorm itory, Holden is further irritated by his unhygienic neighbor,
          Ackley, and by his own roommate, Strad later. Stradlater spends the
          evening on a date with Jane Gallagher, a girl whom Holden used to date
          and whom he still admires. During the course of the evening, Holden
          grows increasingly nervous about Stradlater ’s taking Jane out, and
          when Stradlater returns, Holden questions him insist ently about
          whether he tried to have sex with her. Stradlater teases Holden, who
          flies into a rage and attacks Stradlater. Stradlater pins Holden down
          and bloodies his nose. Holden decides that he’s enough of Pencey and
          will goand bloodies his nose.Holden decides that he’s enough of Pencey
          and will go and bloodies his nose. Holden decides that he’s enough of
          Pencey and will go Pencey is Holden’s fourth school; he has already
          failed out of three others.At Pencey, he has failed four out of five
          of his classes and has received notice that he is being expelled, but
          he is not scheduled to return home to Manhattan until Wedne-sday. He
          visits his elderly history teacher, Spencer, to say goodbye, but when
          Spencer tries to reprimand him for his poor academic perfo rm ance,
          Holden becomes annoyed. Back in the dorm itory, Holden is further
          irritated by his unhygienic neighbor, Ackley, and by his own roommate,
          Strad later. Stradlater spends the evening on a date with Jane
          Gallagher, a girl whom Holden used to date and whom he still admires.
          During the course of the evening, Holden grows increasingly nervous
          about Stradlater ’s taking Jane out, and when Stradlater returns,
          Holden questions him insist ently about whether he tried to have sex
          with her. Stradlater teases Holden, who flies into a rage and attacks
          Stradlater. Stradlater pins Holden down and bloodies his nose. Holden
          decides that he’s enough of Pencey and will goand bloodies his
          nose.Holden decides that he’s enough of Pencey and will go and
          bloodies his nose. Holden decides that he’s enough of Pencey and will
          go
        </Text>
      </ScrollView>
    </View>
  );
};

export default Read;

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_Name: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header_Name_Bo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: headerNameBoColorBo,
  },
  header_Name_Au: {
    fontSize: 14,
    color: headerNameBoColorAu,
  },
  body: {
    marginTop: 20,
    marginBottom: 20,
  },
  body_NoiDung: {
    fontSize: 20,
    color: noidungColor,
  },
});
