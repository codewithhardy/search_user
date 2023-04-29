import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import React from "react";
import { Avatar, Card, CardContent, Input, Typography } from "@mui/material";
import styled from "@emotion/styled";

function App() {
  const [data, setData] = React.useState([]);
  const [searchItem, setSearchItem] = React.useState([]);

  const onSearch = (searchValue) => {
    let Users = data;
    let filterdata = data?.filter(
      (item) =>
        item?.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item?.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        item?.last_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (searchValue) {
      setSearchItem(filterdata);
    } else {
      setSearchItem(Users);
    }
  };

  const tempData = async () => {
    await axios
      .get(`https://reqres.in/api/users`)
      .then((res) => {
        setData(res?.data?.data);
        setSearchItem(res?.data?.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  useEffect(() => {
    tempData();
  }, []);

  return (
    <div className="App">
      <div>
        <h2>Employee List</h2>
        <InputContainer>
          <Input
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
          />
        </InputContainer>

        <CardContainer>
          {searchItem?.map((item, key) => {
            return (
              <>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <AvatarDiv>
                      <Avatar
                        alt="Remy Sharp"
                        src={item.avatar}
                        sx={{ width: 56, height: 56 }}
                      />
                    </AvatarDiv>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {item.first_name} {item.last_name}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {item.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      User Id {item.id}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            );
          })}
        </CardContainer>
      </div>
    </div>
  );
}

export default App;

const CardContainer = styled.div`
  width: 85vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`;

const InputContainer = styled.div`
  border: none;
  outline: none;
  padding: 10px;
  line-height: 30px;
  margin-bottom: 30px;
`;

const AvatarDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;
