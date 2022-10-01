
1. Create Project
   => [Create App] > [Web] > [Copy firebaseConfig ]

2. Create FireStore Database

3. Source Code : https://github.com/nelzkie15-oss/firebase-crud

4. Limitations
   => 1MB per document
   => number of documents : unlimited 

5. Sample
 // Read :: All :: Data
                        /* 
                        db.collection('employee').get().then((snapshot) =>
                        {
                          snapshot.docs.forEach(doc => 
                          {
                              var d = doc.data();

                              alert(JSON.stringify(d));
                          });
                        });
                        */
                        // Read :: Specific :: Data 
                        /*
                        db.collection('employee').where("email", "==", "smthubakgale@gmail.com").get().then((snapshot) =>
                        {
                          snapshot.docs.forEach(doc => 
                          {
                              var d = doc.data();

                              alert(JSON.stringify(d));
                          });
                        });
                        */
                        // Read :: Specific :: Count
                        /*
                        db.collection('employee').where("email", "==", "smthubakgale@gmail.com").get().then((snapshot) =>
                        {
                          alert(snapshot.size);
                        });
                        */
                        // Create :: 
                        /*
                        db.collection('employee').add({
                             fullname:'theo',
                             age: 7,
                             address: 'my place',
                             email: 'tesla@mail',
                             added_at: Date()
                        });
                        */ 
                        // Update :: Specific 
                        var d_new = {
                             fullname:'theo', 
                             email: 'tesla@mail' 
                        };

                        db.collection('employee').where("email", "==", d_new.email).get().then((snapshot) =>
                        { 
                            if(snapshot.size >= 1)
                            {
                                snapshot.docs.forEach(doc => 
                                { 
                                    var id = doc.id;  

                                    db.collection('employee').doc(id).set(d_new , { merge: true }); 
                                });
                            }
                        });
                        // Delete:: Specific 
                        var d_new = { 
                             email: 'smthubakgale@gmail.com' 
                        };

                        db.collection('employee').where("email", "==", d_new.email).get().then((snapshot) =>
                        { 
                            if(snapshot.size >= 1)
                            {
                                snapshot.docs.forEach(doc => 
                                { 
                                    var id = doc.id;  
                                    db.collection('employee').doc(id).delete(); 
                                });
                            }
                        });
                        // 
