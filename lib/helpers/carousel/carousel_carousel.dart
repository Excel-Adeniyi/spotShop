import 'package:carousel_slider/carousel_slider.dart';
import 'package:get/get.dart';

class CarouselControllers extends GetxController{
  var currentIndex = 0.obs;

  void onPageChanged(int index, CarouselPageChangedReason changeReason){
    currentIndex.value = index;
  }
}