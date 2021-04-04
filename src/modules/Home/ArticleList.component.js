import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
}));

const theme = createMuiTheme({
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        cursor: "pointer",
      },
    },
  },
});

export const ArticleList = ({ selectedSection }) => {
  const history = useHistory();
  const [articles, setArticles] = useState(null);
  const classes = useStyles();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articlesDataToTable, setArticlesDataToTable] = useState(null);
  const [totalCount,setTotalCount] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [pageDefaults, setPageDefaults] = useState({
    numberOfRows: 10,
    currentPage: 0,
    totalPages: 20,
  });

  const onModalOpen = () => {
    setIsConfirmationModalOpen(true);
  };

  const onModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const onAddReadLater =(data)=>{
      setIsConfirmationModalOpen(true);
  }
  const onAddConfirmation =()=>{
      onModalClose();
  }
  const columns = [
    { name: "Title" },
    { name: "Abstract" },
    { name: "Type" },
    { name: "Source" },
    {
        name: 'Read Later',

        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return <AddCircleOutlineIcon onClick={() => onAddReadLater(tableMeta.rowData)} />;
          },
          filter: false,
        }
    },
  ];

  const onTitleClick = (artcleTitle) => {
    const selectedUrl = articles?.filter((item) => item.title === artcleTitle);
    if(selectedUrl[0]?.url){
        window.location.assign(`${selectedUrl?.[0]?.url}`);
    }
  };

  const options = {
    filterType: "input",
    onCellClick: (cellIndex, rowIndex) => {
      onTitleClick(cellIndex);
    },
    serverSide: true,
    count: parseInt(pageDefaults.totalPages, 10),
    page: pageDefaults.currentPage,
    rowsPerPage: pageDefaults.numberOfRows,
    selectableRows: false,
    textLabels: {
      body: {
        noMatch: 'No articles found',
      },
    },
    onTableChange: (action, tableState) => {
      if (action === 'changePage') {
        setPageDefaults({...pageDefaults,currentPage : tableState.page,numberOfRows:pageDefaults.numberOfRows});
      }
    },

    onChangeRowsPerPage: (numberOfRows) => {
      setPageDefaults({ ...pageDefaults, numberOfRows: numberOfRows });
    },
  };

  useEffect(async () => {
    const result = await axios(
      `https://api.nytimes.com/svc/news/v3/content/all/all.json?page=${pageDefaults.currentPage}&limit=${pageDefaults.numberOfRows}&api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7 `
    );

    setArticles(result?.data?.results);
  }, [pageDefaults.currentPage,pageDefaults.rowsPerPage]);

  useEffect(() => {
    if (articles) {
      const updatedArticle = articles?.map((item) => {
        const filteredArticle = [
          item.title,
          item.abstract,
          item.item_type,
          item.source,
        ];
        return filteredArticle;
      });
      setArticlesDataToTable(updatedArticle);
    }
  }, [articles]);

  useEffect(() => {
    if (selectedSection.section) {
      const formattedArticle = articles.filter(
        (item) => item.section === selectedSection.section
      );
      setSelectedArticle(formattedArticle);
      const updatedArticle = formattedArticle.map((item) => {
        const filteredArticle = [
          item.title,
          item.abstract,
          item.item_type,
          item.source,
        ];
        return filteredArticle;
      });
      setArticlesDataToTable(updatedArticle);
    }
  }, [selectedSection.section]);

  return (
    <ThemeProvider theme={theme}>
         <Box>
          {isConfirmationModalOpen ? (
                <div>
                  <Dialog
                   open={isConfirmationModalOpen}
                   onClose={onModalClose}
                   aria-labelledby="alert-dialog-title"
                   aria-describedby="alert-dialog-description"
                   >
                    <DialogTitle id="alert-dialog-title">
                      {"Add Confirmation"}
                      </DialogTitle>
                       <DialogContent>
                        <DialogContentText
                        id="alert-dialog-description"
                        className={classes.dialogDescription}
                      >
                      {`Are you sure you want to read this article later?`}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={onModalClose} color="primary"> CANCEL</Button>
                        <Button onClick={onAddConfirmation} color="primary" autoFocus>ADD</Button>
                      </DialogActions>
                  </Dialog>
                  </div>
                ) : ("")}
        </Box>
      <Box pl={2} className={classes.container}>
        {articlesDataToTable ? (
          <MUIDataTable
            title={"Article List"}
            data={articlesDataToTable ? articlesDataToTable : []}
            columns={columns}
            options={options}
          />
        ) : (
          []
        )}
      </Box>
    </ThemeProvider>
  );
};
export default ArticleList;
