import {
  StyleSheet, Text,
  View, Image, ScrollView,
  FlatList, Animated, TouchableOpacity
} from 'react-native'
import React from 'react'
import ItemListView2 from './ItemListView2';
const color_text = "#272956";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const pluscolor = "#CDCDCD";
const color_logo = '#272956';
const HotScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={[styles.Headers]}>
        <View style={styles.header}>
          <View style={{ alignItems: 'center', flexDirection: 'row', paddingLeft: 21, flex: 1 }}>
            <Text style={styles.authen}>Hots</Text>
          </View>

          <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', paddingRight: 21 }}>
            <TouchableOpacity >
              <Image style={styles.tok} source={require('../assets/images/search.png')} />
            </TouchableOpacity>
            <Image style={styles.profile} source={require('../assets/images/profile1.png')} />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <FlatList 
          data={DATAne}
          renderItem={({ item }) => <ItemListView2 dulieu={item} navigation={navigation} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default HotScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
  Headers: {
    flexDirection: 'row',
    height:80,
  },
  hot: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Poppins-Medium",
    marginTop: 20,
    marginLeft: 20
  }, icon: {
    marginLeft: 10,
    width: "60%",
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }, search: {
    width: 40,
    height: 40,
    marginTop: 16,
    marginRight: 10
  }
  , profile: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginRight: 20
  }, body: {
    flexDirection: 'column',
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    width:'100%',
    paddingTop:10,
    
  },
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tok: {
    width: 40,
    height: 40,
    marginRight: 8
  }, profile: {
    width: 40,
    height: 40
  },
  authen: {
    marginLeft: 8,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: color_logo,
    letterSpacing: 0.5

  }
})

const DATAne = [
  {
    "id": 1,
    "bookname": "Đắc Nhân Tâm - Quyển 1",
    "author": "Nhiều Tác Giả",
    "content": "Tham gia vào chuyến phiêu lưu đặc biệt: tới thăm xứ Chín Tầng Mây để tìm tung tích của người Sưu Tầm Gối, hay đi theo những tiếng gọi",
    "category": "SÁCH NÓI MỚI",
    "image": "https://nhasachmienphi.com/images/thumbnail/nhasachmienphi-dac-nhan-tam.jpg"
  }, {
    "id": 2,
    "bookname": "Trên Đường Băng - Quyển 1",
    "author": "Nhiều Tác Giả",
    "content": "Cuốn sách Trên đường băng hướng tới đối tượng là độc giả trẻ, là tập hợp những câu chuyện được đăng tải trên fanpage facebook của Tony Buổi Sáng. Nhưng nội dung được tác giả chọn lọc một cách có chủ đích, khác hoàn toàn với loại tản văn thông thường. ",
    "category": "SÁCH TÓM TẮT MỚI",
    "image": "https://docsach24.co/filemanager/data-images/T%C3%A2m%20L%C3%BD%20-%20K%E1%BB%B9%20N%C4%83ng%20S%E1%BB%91ng/tony-buoi-sang-tren-duong-bang.jpg"
  }, {
    "id": 3,
    "bookname": "Người Nam Châm - Bí Mật Của Luật Hấp Dẫn",
    "author": "Nhiều Tác Giả",
    "content": "“Người Nam Châm- Bí Mật Của Luật Hấp Dẫn” là chìa khóa mở ra cánh cửa chứa nhiều bài học và giá trị lớn lao để đạt được mục tiêu sống cho những bạn đã, đang và sẽ đi theo “luật hấp dẫn”, quy luật sống khá quen thuộc với mọi người. ",
    "category": "SÁCH TÓM TẮT MỚI",
    "image": "https://docsach24.co/filemanager/data-images/T%C3%A2m%20L%C3%BD%20-%20K%E1%BB%B9%20N%C4%83ng%20S%E1%BB%91ng/Nguoi-nam-cham---Bi-mat-cua-luat-hap-dan.jpg"
  }
  , {
    "id": 4,
    "bookname": "20 Giờ Đầu Tiên",
    "author": "Nhiều Tác Giả",
    "content": "Việc cảm thấy 24h một ngày là không đủ cũng là chuyện dĩ nhiên trong cuộc sống hiện đại ngày nay. Giải quyết vấn đề này ra sao? Có thực sự nhiều việc đến thế? Bắt tay vào làm như thế nào? Điều gì gây khó khăn cho bạn?...là hàng loạt những câu hỏi đặt ra mà 20 giờ đầu tiên sẽ giúp bạn giải quyết! ",
    "category": "SÁCH TÓM TẮT MỚI",
    "image": "https://docsach24.co/filemanager/data-images/tam-ly-ky-nang-song/sach-20-gio-dau-tien.jpg"
  }
];