import React, { useEffect } from "react";
import { Card, Grid, Text, Divider, Button, Row } from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
import "./Meeting.css";

const Meeting = ({ meeting, setMeetings, contact }) => {
  async function deleteFromLocalServer(meetingId) {
    try {
      await fetch(`http://localhost:3000/meetings/${meetingId}`, {
        method: "DELETE",
      });
      setMeetings((previous) =>
        previous.filter((meeting) => meeting.id !== meetingId)
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="meetings">
      <Grid.Container gap={2}>
        <Grid sm={22} md={15}>
          <Card css={{ mw: "330px" }}>
            <Card.Header>
              <Text b>Appointment: {meeting.firstName}</Text>
            </Card.Header>
            <Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text>Appointment date: {meeting.firstName} </Text>
              <Text>Appointment time: {meeting.time}</Text>
              <Text> Appointment: {meeting.location}</Text>
            </Card.Body>
            <Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Button
                  size="sm"
                  onClick={() => deleteFromLocalServer(meeting.id)}
                >
                  Delete
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Meeting;
