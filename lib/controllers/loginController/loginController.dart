import 'package:dio/dio.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:spotshop/Services/loginService.dart';

import '../../Screen/Dashboard/dashboard.dart';

class LoginController extends GetxController {
  final LoginService _loginService = Get.put(LoginService());
  Rx<String> username = ''.obs;
  Rx<String> password = ''.obs;

  void Login() async {
    final enteredusername = username.value;
    final enteredpassword = password.value;

    try {
      final loginResponse =
          await _loginService.login(enteredusername, enteredpassword);
      if (loginResponse.ok ?? true ) {
        final message = loginResponse.message ?? "Login Successfull";
        Get.snackbar('success', message,
            backgroundColor: Colors.green, colorText: Colors.white);
      return Get.to(Dashboard());
      }
      else {
        final message = "an error has occured";
        Get.snackbar("error", message,
            backgroundColor: Colors.red,
            colorText: Colors.white,
            snackPosition: SnackPosition.TOP);
      }
    } catch (e) {
      if(e is DioException){
        if (e.response?.statusCode == 401) {
          final message = "Username or Password incorrect";
          Get.snackbar('Error', message, backgroundColor: Colors.red, colorText: Colors.white, snackPosition: SnackPosition.TOP);
          return;
        }
      }
      final message = e;
      Get.snackbar('error', message.toString(),
          snackPosition: SnackPosition.BOTTOM);
      throw e;
    }
  }
}
