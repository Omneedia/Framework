App.view.define('xxx', {
    extend: "Ext.window.Window",
    alias: 'widget.xxx',
    initComponent: function() {
        this.width = 640;
        this.height = 480;
        this.title = "...";

        this.layout = {
            type: 'border'
        };

        this.bbar = [
            
        ];
		
        this.defaults = {
            
        };

        this.items = [
		
		];

        this.callParent(arguments);
    }
});