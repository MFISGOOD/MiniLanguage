report(parse("+(a, 10)"),JSON.stringify(
                                                        {
                                                          type:'apply',
                                                          operator: {
                                                            type:'word',
                                                            name: '+'
                                                          },
                                                          args:[
                                                            {
                                                              type:'word',
                                                              name: 'a'
                                                            },
                                                            {
                                                              type: 'value',
                                                              value : 10
                                                            }
                                                          ]
                                                        })
);