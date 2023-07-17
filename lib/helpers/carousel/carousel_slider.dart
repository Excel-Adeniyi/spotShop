import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:spotshop/helpers/carousel/carousel_carousel.dart';

class MyCarouselSlider extends StatelessWidget {
  final CarouselControllers carouselController = Get.put(CarouselControllers());
  final bool isMobile = GetPlatform.isMobile;

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("SpotSHOP",
                    style: TextStyle(
                        color: Colors.black,
                        decoration: TextDecoration.none,
                        fontFamily: 'Bacasime')),
                Icon(
                  Icons.add_shopping_cart,
                  size: 40.0,
                  color: Colors.redAccent,
                )
              ],
            ),
            CarouselSlider(
              items: [
                Column(
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    Expanded(
                      child: Image.asset(
                        'lib/assets/images/project.png',
                        width: isMobile ? 400 : 1000,
                        height: isMobile ? 500 : 2000,
                        semanticLabel: 'Efficiency at your fingertips',
                      ),
                    ),
                    const Text(
                      'Efficiency at your fingertips',
                      style: TextStyle(
                          fontSize: 10,
                          fontFamily: 'Bacasime',
                          decoration: TextDecoration.none,
                          fontWeight: FontWeight.bold,
                          color: Colors.black54),
                    ),
                  ],
                ),
                Column(
                  children: [
                    Expanded(
                      child: Image.asset(
                        'lib/assets/images/undrawfr.png',
                        width: isMobile ? 400 : 800,
                        height: isMobile ? 500 : 1000,
                      ),
                    ),
                    const Text(
                      'Streamline your store operations',
                      style: TextStyle(
                          fontSize: 10,
                          fontFamily: 'Bacasime',
                          decoration: TextDecoration.none,
                          fontWeight: FontWeight.bold,
                          color: Colors.black54),
                    ),
                  ],
                ),
                Column(
                  children: [
                    Expanded(
                        child: Image.asset(
                      'lib/assets/images/undrawRe.png',
                      width: isMobile ? 400 : 800,
                      height: isMobile ? 500 : 1000,
                    )),
                    const Text(
                      'Monitor sales, anytime, anywhere',
                      style: TextStyle(
                          fontSize: 10,
                          fontFamily: 'Bacasime',
                          decoration: TextDecoration.none,
                          fontWeight: FontWeight.bold,
                          color: Colors.black54),
                    ),
                  ],
                ),
              ],
              options: CarouselOptions(
                height: 200.0,
                enlargeCenterPage: true,
                onPageChanged: carouselController.onPageChanged,
              ),
            ),
            const SizedBox(
              height: 20.0,
            ),
            Obx(() => Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(
                    3,
                    (index) => Container(
                      width: 4.0,
                      height: 10.0,
                      margin: EdgeInsets.symmetric(horizontal: 2.0),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: carouselController.currentIndex.value == index
                            ? Colors.blue
                            : Colors.grey,
                      ),
                    ),
                  ),
                )),

          ],
        ),
      ),
    );
  }
}
