import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:spotshop/controllers/csrfController.dart';

import '../model/loginResponse/login_response.dart';

class LoginService {
  final CsrfController _csrfController = Get.find<CsrfController>();

  Future<LoginResponse> login(String enteredusername,
      String enteredpassword) async {
    final csrfToken = _csrfController.csrfToken.value.token;
    print(csrfToken);
    final url = 'http://172.21.67.29:1090/users/login';
    final Dio _dio = Dio();
    try {
      final response = await _dio.post(url, data: {
      'username': enteredusername,
      'password': enteredpassword,
        'csrf': csrfToken
      },
      options: Options(
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        }
      )
      );
      final loginResponse = LoginResponse.fromJson(response.data);
      return loginResponse;
    } catch (e) {
      throw e;
    }
  }
}