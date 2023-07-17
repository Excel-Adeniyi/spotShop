import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/loginController/loginController.dart';

class Dashboard extends StatelessWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final LoginController loginController = Get.find<LoginController>();
    const textColor = Colors.white;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF324E37),
        shadowColor: Colors.transparent,
      ),
      drawer: Drawer(
        child: ListView(
          children: [
            Container(
                color: Colors.white,
                child: Image.asset('lib/assets/images/ssh.png')),
            TextButton(onPressed: () {}, child: Text('Dashboard')),
            TextButton(onPressed: () {}, child: Text('Product')),
            TextButton(
              onPressed: () {},
              child: Text('Outstanding Payment'),
            ),
            TextButton(
              onPressed: () {},
              child: Text('End of Day'),
            )
          ],
        ),
      ),
      body: Column(
        children: <Widget>[
          Container(
            width: 1000,
            height: 300,
            padding: const EdgeInsets.all(12.0),
            decoration: const BoxDecoration(
              borderRadius: BorderRadius.vertical(bottom: Radius.circular(40)),
              color: Color(0xFF324E37),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Text(
                      'Welcome,',
                      style: TextStyle(
                          color: textColor,
                          fontFamily: 'Bacasime',
                          fontSize: 24),
                    ),
                    const SizedBox(
                      width: 3,
                    ),
                    Text(
                      '${loginController.username}',
                      style: const TextStyle(
                          color: textColor,
                          fontFamily: 'Bacasime',
                          fontSize: 24),
                    ),

                  ],
                ),
              ],
            ),
          ),
          Text('${loginController.username}')
        ],
      ),
    );
  }
}
