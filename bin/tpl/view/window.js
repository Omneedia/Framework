App.view.define('$namespace', {
    extend: "Ext.window.Window",
    alias: 'widget.$name',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;

        this.layout = {
            type: 'vbox'
        };

        this.bbar = [
        ];

        this.tbar = [
        ];
		
        this.defaults = {
            split: true
        };

        this.items = [
		];

        this.callParent();
    }
});