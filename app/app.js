Ext.application({
    name: 'Sencha',

    launch: function() {
        Ext.create("Ext.tab.Panel", {
            fullscreen: true,
            items: [
                {
                    title: 'Start',
                    iconCls: 'home',
                    html: 'Welcome'
                }
            ]
        });
    }
});