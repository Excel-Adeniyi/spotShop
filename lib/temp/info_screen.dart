import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:spotshop/Screen/login/login.dart';
import 'package:spotshop/helpers/carousel/carousel_slider.dart';

import '../controllers/sharepreference/SharedPreference.dart';


class InfoScreen extends StatelessWidget {
  const InfoScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final SharedPreferencesController prefs = Get.put(SharedPreferencesController());
    return Container(

      color: Colors.white,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              MyCarouselSlider(),
            ],
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              TextButton(onPressed: () => Get.to(const Login()), child: Text('Skip')),
            ],

          )
        ],
      ),
    );
  }
}
