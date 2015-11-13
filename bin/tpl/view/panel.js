App.view.define('$namespace', {
    extend: "Ext.Panel",
    alias: 'widget.$name',
    initComponent: function() {

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