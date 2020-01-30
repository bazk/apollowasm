/** @jsx jsx */
import { jsx } from "theme-ui";
import PropTypes from "prop-types";
import { Box } from "rebass";

const Checklist = ({ items }) => (
  <Box
    p={2}
    bg="checklistBackground"
    sx={{
      boxShadow: "2px 2px 8px -3px rgba(0, 0, 0, 0.5)"
    }}
  >
    <h1 sx={{ fontWeight: "bold", marginBottom: 2 }}>
      Saturn V Launch Checklist
    </h1>
    <ol>
      {items &&
        items.map(item => (
          <li
            key={item}
            sx={{
              marginBottom: 2
            }}
          >
            {item}
          </li>
        ))}
    </ol>
  </Box>
);

Checklist.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string)
};

export default Checklist;
