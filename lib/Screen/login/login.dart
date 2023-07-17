import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:spotshop/controllers/loginController/loginController.dart';

class Login extends StatelessWidget {
  const Login({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final LoginController loginController = Get.put(LoginController());
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              const Expanded(
                  child: Image(image: AssetImage('lib/assets/images/ssh.png'),)),
              Align(
                alignment: Alignment.bottomCenter,
                child: Container(
                  height: 400,

                  decoration:  BoxDecoration(
                    color: Colors.lightBlue[800],
                    border: Border.all(color: Colors.black12),
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(30)),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          'Sign In',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.white
                          ),
                        ),
                        const SizedBox(height: 20,),
                        TextFormField(
                          onChanged: loginController.username,
                          decoration: const InputDecoration(
                            filled: true, // Enable filled background
                            fillColor: Colors.white70, // Set the fill color here
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Color(0xFFFFFFFF))
                            ),
                            labelText: 'Username',

                          ),
                        ),
                        const SizedBox(height: 20),
                        TextFormField(
                          onChanged: loginController.password,
                          obscureText: true,
                          decoration: const InputDecoration(
                            filled: true, // Enable filled background
                            fillColor: Colors.white70,
                            border: OutlineInputBorder(),
                            labelText: 'Password',
                          ),
                        ),
                        const SizedBox(height: 20),
                        ElevatedButton(
                          style: const ButtonStyle(),
                          onPressed: () {
                            loginController.Login();
                          },
                          child: const Text('Login'),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
