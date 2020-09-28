import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Column(
              children: [
                Padding(
                  padding: EdgeInsets.fromLTRB(
                      MediaQuery.of(context).size.width * 0.3,
                      0,
                      MediaQuery.of(context).size.width * 0.3,
                      10.0),
                  child: TextField(
                    decoration: InputDecoration(
                      border: new OutlineInputBorder(
                        borderSide: new BorderSide(color: Colors.teal),
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(
                      MediaQuery.of(context).size.width * 0.3,
                      0,
                      MediaQuery.of(context).size.width * 0.3,
                      0),
                  child: TextField(
                    decoration: InputDecoration(
                      border: new OutlineInputBorder(
                        borderSide: new BorderSide(color: Colors.teal),
                      ),
                    ),
                  ),
                ),
                Padding(
                    padding: EdgeInsets.all(12),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.all(Radius.circular(8)),
                            border: Border(
                              top: BorderSide(width: 1.0, color: Colors.grey),
                              left: BorderSide(width: 1.0, color: Colors.grey),
                              right: BorderSide(width: 1.0, color: Colors.grey),
                              bottom:
                                  BorderSide(width: 1.0, color: Colors.grey),
                            ),
                          ),
                          margin: EdgeInsets.all(10.0),
                          width: 48.0,
                          height: 48.0,
                        ),
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.all(Radius.circular(8)),
                            border: Border(
                              top: BorderSide(width: 1.0, color: Colors.grey),
                              left: BorderSide(width: 1.0, color: Colors.grey),
                              right: BorderSide(width: 1.0, color: Colors.grey),
                              bottom:
                                  BorderSide(width: 1.0, color: Colors.grey),
                            ),
                          ),
                          margin: EdgeInsets.all(10.0),
                          width: 48.0,
                          height: 48.0,
                        ),
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.all(Radius.circular(8)),
                            border: Border(
                              top: BorderSide(width: 1.0, color: Colors.grey),
                              left: BorderSide(width: 1.0, color: Colors.grey),
                              right: BorderSide(width: 1.0, color: Colors.grey),
                              bottom:
                                  BorderSide(width: 1.0, color: Colors.grey),
                            ),
                          ),
                          margin: EdgeInsets.all(10.0),
                          width: 48.0,
                          height: 48.0,
                        ),
                      ],
                    ))
              ],
            )
          ],
        ),
      ),
    );
  }
}
