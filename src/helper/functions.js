import RNHTMLtoPDF from 'react-native-html-to-pdf';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log(fcmToken);
        console.log("Your Firebase Token is:", fcmToken);
    } else {
        console.log("Failed", "No token received");
    }
}

export const manageNotifcations = () => {
    getFcmToken();
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });

}

export const trimTimeFromDate = (dateTime) => {
    try {
        let arr = dateTime.split('T');
        return arr[0];
    } catch (e) {
        return null;
    }
}

export const isJobPortalUrl = (url) => {
    if (url.includes('https://jobportal.pk/'))
        return true
    return false
}
//method to create pdf from html
export const createPDF = async (htmlContext, fileName) => {
    let options = {
        html: htmlContext,
        fileName: fileName,
        directory: 'Documents',
    };
    try {
        let file = await RNHTMLtoPDF.convert(options)
        alert('File has been stored in Documents folder.\n Exact Path: ' + file.filePath);
    } catch (e) {
        alert('Sorry there is an error, please check make sure Storage permission is granted.')
    }
}
//request permission

//request permissions Camera & External Storage
export const requestPermissions = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
            {
                title: " Storage Permission",
                message:
                    "Allow Write Storage.",
                buttonPositive: "OK"
            }
        );
        if (
            granted['android.permission.WRITE_EXTERNAL_STORAGE']
            == 'granted'
        ) {
            console.log("Permissions granted");
            return true
        } else {
            console.log("Permissions denied");
            return false
        }
    } catch (err) {
        return false
        console.warn(err);
    }
};