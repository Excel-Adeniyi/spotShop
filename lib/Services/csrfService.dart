import 'package:dio/dio.dart';
import 'package:get/get.dart';

import 'package:spotshop/controllers/csrfController.dart';

class CsrfServiceController extends GetxController {
  final CsrfController _csrfController = Get.find<CsrfController>();
  @override
  void onInit() {
    super.onInit();
    fetchCsrfToken();
  }
  Future<String> fetchCsrfToken() async {
    try {
      final response = await Dio().get('http://172.21.67.29:1090/users/login');
      final token = response.data['csrfToken'] as String;
      _csrfController.setCsrtToken(token);
      print('Token: $token');
      return token;
    } catch (e) {
      throw e;
    }
  }
}