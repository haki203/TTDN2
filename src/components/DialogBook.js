import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react';
import Icon_1 from 'react-native-vector-icons/Ionicons';
import Icon_2 from 'react-native-vector-icons/FontAwesome';

const DialogBook = () => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(prevShowMore => !prevShowMore);
    };
    return (
        <View style={styles.Container}>
            <View style={styles.Icon_Container}>
                <TouchableOpacity>
                    <Icon_1 name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.Text_BinhLuan}>Tất cả bình luận</Text>
                <View></View>
            </View>
            <View style={styles.Separator}></View>
            <ScrollView>
                <View style={styles.View_DocGia}>
                    <Text style={styles.Text_DocGia}>Bởi Trần Thức ngày 09/10/2023</Text>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Nội dung:</Text>
                        <View style={styles.Star}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Giọng đọc:</Text>
                        <View style={styles.Star1}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.Text_Review}>Cuốn sách này thật sự xuất sắc! Nội dung sâu sắc, ngôn ngữ tinh tế và tạo cảm xúc mạnh mẽ. Đây là một tác phẩm đáng đọc và để lại ấn tượng sâu sắc.
                            {showMore && (
                                <Text>
                                    {' '}
                                    Đó là 1 quyển sách tuyệt vời.
                                </Text>
                            )}
                            <TouchableOpacity onPress={toggleShowMore} style={styles.toggleButton}>
                                <Text style={styles.toggleButtonText_1}> {showMore ? 'Thu gọn' : 'Xem thêm'} </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
                <View style={styles.View_DocGia}>
                    <Text style={styles.Text_DocGia}>Bởi Trường Thọ ngày 08/10/2023</Text>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Nội dung:</Text>
                        <View style={styles.Star}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Giọng đọc:</Text>
                        <View style={styles.Star1}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.Text_Review}>Cuốn sách này thật sự xuất sắc! Nội dung sâu sắc, ngôn ngữ tinh tế và tạo cảm xúc mạnh mẽ. Đây là một tác phẩm đáng đọc và để lại ấn tượng sâu sắc.
                            {showMore && (
                                <Text>
                                    {' '}
                                    Đó là 1 quyển sách tuyệt vời.
                                </Text>
                            )}
                            <TouchableOpacity onPress={toggleShowMore} style={styles.toggleButton}>
                                <Text style={styles.toggleButtonText_1}> {showMore ? 'Thu gọn' : 'Xem thêm'} </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
                <View style={styles.View_DocGia}>
                    <Text style={styles.Text_DocGia}>Bởi Long Vũ ngày 10/10/2023</Text>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Nội dung:</Text>
                        <View style={styles.Star}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Giọng đọc:</Text>
                        <View style={styles.Star1}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.Text_Review}>Cuốn sách này thật sự xuất sắc! Nội dung sâu sắc, ngôn ngữ tinh tế và tạo cảm xúc mạnh mẽ. Đây là một tác phẩm đáng đọc và để lại ấn tượng sâu sắc.
                            {showMore && (
                                <Text>
                                    {' '}
                                    Đó là 1 quyển sách tuyệt vời.
                                </Text>
                            )}
                            <TouchableOpacity onPress={toggleShowMore} style={styles.toggleButton}>
                                <Text style={styles.toggleButtonText_1}> {showMore ? 'Thu gọn' : 'Xem thêm'} </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
                <View style={styles.View_DocGia}>
                    <Text style={styles.Text_DocGia}>Bởi Văn Việt ngày 02/10/2023</Text>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Nội dung:</Text>
                        <View style={styles.Star}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Giọng đọc:</Text>
                        <View style={styles.Star1}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.Text_Review}>Cuốn sách này thật sự xuất sắc! Nội dung sâu sắc, ngôn ngữ tinh tế và tạo cảm xúc mạnh mẽ. Đây là một tác phẩm đáng đọc và để lại ấn tượng sâu sắc.
                            {showMore && (
                                <Text>
                                    {' '}
                                    Đó là 1 quyển sách tuyệt vời.
                                </Text>
                            )}
                            <TouchableOpacity onPress={toggleShowMore} style={styles.toggleButton}>
                                <Text style={styles.toggleButtonText_1}> {showMore ? 'Thu gọn' : 'Xem thêm'} </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
                <View style={styles.View_DocGia}>
                    <Text style={styles.Text_DocGia}>Bởi Thiện Chiến ngày 11/10/2023</Text>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Nội dung:</Text>
                        <View style={styles.Star}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Giọng đọc:</Text>
                        <View style={styles.Star1}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.Text_Review}>Cuốn sách này thật sự xuất sắc! Nội dung sâu sắc, ngôn ngữ tinh tế và tạo cảm xúc mạnh mẽ. Đây là một tác phẩm đáng đọc và để lại ấn tượng sâu sắc.
                            {showMore && (
                                <Text>
                                    {' '}
                                    Đó là 1 quyển sách tuyệt vời.
                                </Text>
                            )}
                            <TouchableOpacity onPress={toggleShowMore} style={styles.toggleButton}>
                                <Text style={styles.toggleButtonText_1}> {showMore ? 'Thu gọn' : 'Xem thêm'} </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
                <View style={styles.View_DocGia}>
                    <Text style={styles.Text_DocGia}>Bởi Quốc Bảo ngày 05/10/2023</Text>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Nội dung:</Text>
                        <View style={styles.Star}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View style={styles.View_NoiDung_DocGia}>
                        <Text style={styles.Text_NoiDung_DocGia}>Giọng đọc:</Text>
                        <View style={styles.Star1}>
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                            <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.Text_Review}>Cuốn sách này thật sự xuất sắc! Nội dung sâu sắc, ngôn ngữ tinh tế và tạo cảm xúc mạnh mẽ. Đây là một tác phẩm đáng đọc và để lại ấn tượng sâu sắc.
                            {showMore && (
                                <Text>
                                    {' '}
                                    Đó là 1 quyển sách tuyệt vời.
                                </Text>
                            )}
                            <TouchableOpacity onPress={toggleShowMore} style={styles.toggleButton}>
                                <Text style={styles.toggleButtonText_1}> {showMore ? 'Thu gọn' : 'Xem thêm'} </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default DialogBook

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Icon_Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    Text_BinhLuan: {
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#272956',
        fontSize: 18,
    },
    Text_Review: {
        paddingTop: 10,
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#9D9DA1'
    },
    View_Review: {
        margin: 20,
        padding: 20,
        backgroundColor: '#808080',
        borderRadius: 20,
    },
    toggleButtonText_1: {
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Poppins',
        color: 'black',
    },
    toggleButton: {
        flexDirection: 'row',
    },
    Separator: {
        borderBottomColor: '#272956',
        borderBottomWidth: 0.5,
        marginRight: 20,
        marginLeft: 20,
    },
    View_DocGia: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        marginTop:10,
        backgroundColor: '#F4F4F4',
        padding: 15,
    },
    Text_DocGia: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#272956'
    },
    View_NoiDung_DocGia: {
        flexDirection: 'row',
    },
    Star: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    Star1: {
        flexDirection: 'row',
        paddingLeft: 12,
    },
    Next: {
        paddingTop: 6,
        color: '#272956',
    },
    Text_NoiDung_DocGia: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#272956',
    },
})