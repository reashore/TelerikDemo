
import React, { Component } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { Calendar } from '@progress/kendo-dateinputs-react-wrapper';
import { Grid } from '@progress/kendo-grid-react-wrapper';
import { kendo } from "@progress/kendo-ui";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: new Date()
    };

    this.onchange = this.onchange.bind(this);
  }

  onchange(event) {
    this.state({
      dateTime: event.sender.value()
    })
  }

  render() {
    const demoStyle = {
      margin: 10,
      padding: 10
    };

    const gridOptions = {
      dataSource: {
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/Products",
            dataType: "jsonp"
          },
          update: {
            url: "https://demos.telerik.com/kendo-ui/service/Products/Update",
            dataType: "jsonp"
          },
          destroy: {
            url: "https://demos.telerik.com/kendo-ui/service/Products/Destroy",
            dataType: "jsonp"
          },
          create: {
            url: "https://demos.telerik.com/kendo-ui/service/Products/Create",
            dataType: "jsonp"
          },
          parameterMap: function (options, operation) {
            if (operation !== "read" && options.models) {
              return { models: kendo.stringify(options.models) };
            }
          }
        },
        schema: {
          model: {
            id: "ProductID",
            fields: {
              ProductID: { editable: false, nullable: true },
              ProductName: { validation: { required: true } },
              UnitPrice: { type: "number", validation: { required: true, min: 1 } },
              Discontinued: { type: "boolean" },
              UnitsInStock: { type: "number", validation: { min: 0, required: true } }
            }
          }
        },
        pageSize: 20
      },
      height: 550,
      selectable: true,
      filterable: true,
      groupable: true,
      sortable: true,
      pageable: true,
      editable: "popup",
      toolbar: ['create'],
      columns: [
        { field: "ProductID", filterable: false, title: "ProductID" },
        { field: "ProductName", title: "Product Name" },
        { field: "UnitPrice", title: "Unit Price", format: "{0:c}" },
        { field: "UnitsInStock", title: "Units In Stock" },
        { field: "Discontinued", title: "Discontinued" },
        { command: ['edit', 'destroy'] }
      ]
    };

    return (
      <div  style={demoStyle}>
        <Calendar value={this.state.dateTime} change={this.onchange} />

        <Grid {...gridOptions} />
      </div>
    );
  }
}

export default App;
