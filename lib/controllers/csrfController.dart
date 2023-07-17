import 'package:get/get.dart';
import 'package:spotshop/model/csrtToken/csrf_token_model.dart';

class CsrfController extends GetxController {
  Rx<CsrfTokenModel> csrfToken = Rx<CsrfTokenModel>(CsrfTokenModel(token: ''));


  void setCsrtToken(String token) {
    csrfToken.value = CsrfTokenModel(token: token);

    print('CSRF Token set: ${csrfToken.value.token}');
  }
}
