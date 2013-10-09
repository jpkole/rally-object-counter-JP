Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        var me = this;
        var types = {
            'Project':'--',
            'Release':'--',
            'Iteration':'--',
            'PortfolioItem':'--',
            'HierarchicalRequirement':'--',
            'Defect':'--',
            'TestSet':'--',
            'Task':'--',
            'TestCase':'--',
            'TestCaseResult':'--',
            'TestFolder':'--',
            'Attachment':'--'
        };
        
        var tpl = me._getTemplate(types);
        
        var display_container = this.add({
            xtype:'container',
            tpl: tpl,
            margin: 10
        });
        
        Ext.Object.each(types, function(type_name){
            me._getCount(type_name,types,display_container);
        });
    },
    _getTemplate:function(types){
        console.log('template for types:',types);
        var template_array = ['<p><b>Workspace</b>:' + this.getContext().getWorkspace().Name + '</p>'];
        Ext.Object.each( types, function(type_name) {
            template_array.push('<p><b>' + type_name + 's</b>: {' + type_name + '}</p>');
        });
        console.log(template_array);
        return new Ext.XTemplate(template_array);
    },
    _getCount:function(type_name,types,display_container){
        types[type_name] = '--';
        display_container.update(types);
        Ext.create('Rally.data.WsapiDataStore',{
            model: type_name,
            limit: 1,
            pageSize: 1,
            autoLoad: true,
            context: { project: null },
            listeners: {
                load: function(store,records){
                    console.log(records.length);
                    types[type_name] = store.getTotalCount();
                    display_container.update(types);
                }
            }
        });

        
    }
});
