Ext.application({
    name: 'Datenschutz',

    launch: function() {
        // The whole app UI lives in this tab panel
        Ext.Viewport.add({
            xtype: 'tabpanel',
            fullscreen: true,
            tabBarPosition: 'bottom',
		
            items: [
                // This is the home page, just some simple HTML
                {
                    title: 'Home',
                    iconCls: 'home',
                    cls: 'home',
                    
                    html: [
                        '<h1>Willkommen zum Datenschutz-Quiz</h1>',
                        "<p>Wir wuenschen dir viel Erfolg!</p>",
                        '<h2>Start hier</h2>'
                    ].join(""),
                    ui:'confirm', text:'Start' 
                          
   
                },
 
                // This is the recent blogs page. It uses a tree store to load its data from blog.json.
                {
                    xtype: 'nestedlist',
                    title: 'Blog',
                    iconCls: 'star',
                    cls: 'blog',
                    displayField: 'title',

                    store: {
                        type: 'tree',

                        fields: ['title', 'link', 'author', 'contentSnippet', 'content', {
                            name: 'leaf',
                            defaultValue: true
                        }],

                        root: {
                            leaf: false
                        },

                        proxy: {
                            type: 'jsonp',
                            url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
                            reader: {
                                type: 'json',
                                rootProperty: 'responseData.feed.entries'
                            }
                        }
                    },

                    detailCard: {
                        xtype: 'panel',
                        scrollable: true,
                        styleHtmlContent: true
                    },

                    listeners: {
                        itemtap: function(nestedList, list, index, element, post) {
                            this.getDetailCard().setHtml(post.get('content'));
                        }
                    }
                },

                // This is the contact page, which features a form and a button. The button submits the form.
                {
                    xtype: 'formpanel',
                    title: 'Contact Us',
                    iconCls: 'user',
                    url: 'contact.php',
                    layout: 'vbox',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Contact Us',
                            instructions: 'Email address is optional',
                            height: 285,
                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Name',
                                    name: 'name'
                                },
                                {
                                    xtype: 'emailfield',
                                    label: 'Email',
                                    name: 'email'
                                },
                                {
                                    xtype: 'textareafield',
                                    label: 'Message',
                                    name: 'message',
                                    height: 90
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Send',
                            ui: 'confirm',

                            // The handler is called when the button is tapped
                            handler: function() {

                                // Look up the items stack and get a reference to the first form it finds
                                var form = this.up('formpanel');

                                // Send an AJAX request with form data to the URL for contact.php
                                // Call the success callback if we get a non-error response from the server
                                form.submit({
                                    success: function() {
                                        // Run the callback function when a user taps the OK button
                                        Ext.Msg.alert('Thank You', 'Your message has been received', function() {
                                            form.reset();
                                        });
                                    }
                                });
                            }
                        }
                    ]
                }
            ]
        });
    }
});
